import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import TemplateGroupPopup from "@/components/TemplateGroupPopup";
import ModalWrapper from "@/components/ModalWrapper";
import VariableInputContainer from "@/components/VariableInputContainer";
import HashtagList from "@/components/HashtagList";

import { fetchTemplate } from "@/utils/api";
import { applyTemplate, storeCurrentCursor } from "@/utils/template";
import { extractVariables, fillTemplateWithVariables } from "@/utils/templateVariable";
import { getHashtagListPosition } from "@/utils/hashtag";
import { EDITOR_PATH } from "@/utils/constants";

import { CursorRef, Position, Template, TemplateVariable } from "@/types";

type IconButtonProps = {
  editorId: string;
};

export default function IconButton({ editorId }: IconButtonProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [template, setTemplate] = useState<Template | null>(null);
  const [templateVariables, setTemplateVariables] = useState<TemplateVariable>({});
  const [hashtagKeyword, setHashtagKeyword] = useState("");
  const [hashtagPosition, setHashtagPosition] = useState<Position>({ left: 0, top: 0 });

  const cursorRef = useRef<CursorRef>({
    rangeCount: 0,
    range: document.createRange(),
    removeAllRanges: () => {},
    addRange: () => {},
  });

  const isHashtagMode = hashtagKeyword.length > 1 && hashtagKeyword.startsWith("#");

  const handleTemplateMouseDown = () => storeCurrentCursor(cursorRef);

  const handleTemplateSelect = async (templateId: number) => {
    if (!templateId) return;

    setShowPopup(false);
    setHashtagKeyword("");

    const result = await fetchTemplate(templateId);
    setTemplate(result);

    const variables = extractVariables(result);

    if (Object.keys(variables).length > 0) {
      setTemplateVariables(variables);
      setShowModal(true);
    } else {
      applyTemplate(editorId, result, cursorRef);
    }
  };

  const handleInput = (name: string, value: string) => {
    setTemplateVariables((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVariableApply = () => {
    if (!template) return;

    const filledTemplate = fillTemplateWithVariables(template, templateVariables);

    applyTemplate(editorId, filledTemplate, cursorRef);
    setTemplate(null);
    setShowModal(false);
  };

  const handleHashtagInput = useCallback((event: Event) => {
    if (!(event instanceof InputEvent)) return;

    const { inputType, data } = event;

    if (inputType === "insertText") {
      if (data === "#") {
        setHashtagKeyword("#");

        const position = getHashtagListPosition(editorId);

        if (position) {
          setHashtagPosition({ ...position });
        }
      } else if (data === " " || data === null) {
        setHashtagKeyword("");
      } else {
        setHashtagKeyword((prev) => prev + data);
      }

      return;
    }

    if (inputType === "deleteContentBackward") {
      setHashtagKeyword((prev) => prev.substring(0, prev.length - 1));
    } else if (inputType === "insertParagraph") {
      setHashtagKeyword("");
    }
  }, []);

  useEffect(() => {
    const editorSelector = `div[aria-labelledby='${editorId}'], #${editorId}`;
    const $editorContainer = document.querySelector(editorSelector);
    const $editor = $editorContainer?.querySelector(EDITOR_PATH) as HTMLDivElement | null;

    if ($editor) $editor.addEventListener("input", handleHashtagInput);

    return () => {
      if ($editor) $editor.removeEventListener("input", handleHashtagInput);
    };
  }, [handleHashtagInput]);

  return (
    <>
      <button
        className={`flex justify-center ml-2.5 cursor-pointer ${showPopup ? "text-primary" : "text-gray-600"} hover:text-primary`}
        data-tooltip="Glerk 템플릿 추가"
        aria-label="Glerk 템플릿 추가"
        onClick={() => setShowPopup(!showPopup)}
        onMouseDown={handleTemplateMouseDown}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="16"
          height="16"
        >
          <path d="M21.41,5h-4.41V.59l4.41,4.41Zm-5.41,13H8v-6h8v6Zm6-11V24H2V3C2,1.34,3.34,0,5,0H15V7h7Zm-16,0h5v-2H6v2Zm12,3H6v10h12V10Z" />
        </svg>
      </button>
      {showPopup && <TemplateGroupPopup onTemplateSelect={handleTemplateSelect} />}
      {showModal && (
        <ModalWrapper onModalClose={() => setShowModal(false)}>
          <VariableInputContainer
            variables={templateVariables}
            handleInput={handleInput}
            applyVariable={handleVariableApply}
          />
        </ModalWrapper>
      )}
      {isHashtagMode &&
        createPortal(
          <HashtagList
            hashtagKeyword={hashtagKeyword}
            hashtagPosition={hashtagPosition}
            onTemplateClick={handleTemplateSelect}
            onTemplateMouseDown={handleTemplateMouseDown}
            cursorRef={cursorRef}
          />,
          document.querySelector(`div[aria-labelledby='${editorId}'],
             #${editorId}`)!,
        )}
    </>
  );
}
