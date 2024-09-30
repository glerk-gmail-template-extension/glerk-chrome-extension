import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import TemplateGroupPopup from "../../components/TemplateGroupPopup";
import ModalWrapper from "../../components/ModalWrapper";
import VariableInputContainer from "../../components/VariableInputContainer";
import HashtagList from "../../components/HashtagList";

import { fetchGroups, fetchTemplate } from "../../utils/api";
import { applyTemplate, storeCurrentCursor } from "../../utils/template";
import { extractVariables, fillTemplateWithVariables } from "../../utils/templateVariable";
import { getHashtagListPosition } from "../../utils/hashtag";

import { CursorRef, Group, Template, TemplateVariable } from "../../types";

type IconButtonProps = {
  emailEditorId: string;
};

export default function IconButton({ emailEditorId }: IconButtonProps) {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const textColor = showPopup ? "text-primary" : "text-gray-600";
  const cursorRef = useRef<CursorRef>({
    rangeCount: 0,
    range: document.createRange(),
    removeAllRanges: () => {},
    addRange: () => {},
  });

  const handleTemplateMouseDown = () => {
    storeCurrentCursor(cursorRef);
  };

  const [templateGroups, setTemplateGroups] = useState<Group[]>([]);
  const [prevSearchNameLength, setPrevSearchNameLength] = useState(0);

  const serachTemplate = async (templateName?: string) => {
    const groups = await fetchGroups(templateName);
    setTemplateGroups(groups);
  };

  const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      serachTemplate(event.currentTarget.value);
    }
  };

  const handleTemplateNameInput = async (templateName: string) => {
    const currentSearchNameLength = templateName.length;

    if (currentSearchNameLength !== prevSearchNameLength) {
      if (currentSearchNameLength === 0) {
        await serachTemplate();
      } else if (currentSearchNameLength > prevSearchNameLength) {
        await serachTemplate(templateName.substring(0, currentSearchNameLength - 1));
      } else {
        await serachTemplate(templateName);
      }
    }

    setPrevSearchNameLength(currentSearchNameLength);
  };

  useEffect(() => {
    serachTemplate();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [template, setTemplate] = useState<Template | null>(null);
  const [templateVariables, setTemplateVariables] = useState<TemplateVariable>({});
  const [hashtagKeyword, setHashtagKeyword] = useState("");
  const isHashtagMode = hashtagKeyword.length > 1 && hashtagKeyword.startsWith("#");

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleTemplateSelect = async (templateId: number) => {
    if (!templateId) return;

    setShowPopup(false);
    setHashtagKeyword("");

    const result = await fetchTemplate(templateId);
    setTemplate(result);

    const variables = extractVariables(result);

    if (Object.keys(variables).length > 0) {
      setTemplateVariables(variables);
      openModal();
    } else {
      applyTemplate(emailEditorId, result, cursorRef);
    }
  };

  const handleInput = (name: string, value: string) => {
    setTemplateVariables({
      ...templateVariables,
      [name]: value,
    });
  };

  const handleVariableApply = () => {
    if (!template) return;

    const filledTemplate = fillTemplateWithVariables(template, templateVariables);

    applyTemplate(emailEditorId, filledTemplate, cursorRef);
    setTemplate(null);
    closeModal();
  };

  const [hashtagPosition, setHashtagPosition] = useState({
    left: 0,
    top: 0,
  });

  const showHashtagList = () => {
    const position = getHashtagListPosition(emailEditorId);

    if (position) {
      setHashtagPosition({ ...position });
    }
  };

  const handleHashtagInput = (event: Event) => {
    if (!(event instanceof InputEvent)) return;

    const { inputType, data } = event;

    if (inputType === "insertText") {
      if (data === "#") {
        setHashtagKeyword("#");
        showHashtagList();
      } else if (data === " " || data === null) {
        setHashtagKeyword("");
      } else {
        setHashtagKeyword((prev) => prev + data);
      }
    } else if (inputType === "deleteContentBackward") {
      setHashtagKeyword((prev) => prev.substring(0, prev.length - 1));
    } else if (inputType === "insertParagraph") {
      setHashtagKeyword("");
    }
  };

  useEffect(() => {
    const $editorContainer = document.querySelector(
      `div[aria-labelledby='${emailEditorId}'], #${emailEditorId}`,
    );

    const $editor = $editorContainer?.querySelector(
      "div[g_editable='true'][role='textbox'][contenteditable='true']",
    ) as HTMLDivElement | null;

    if ($editor) {
      $editor.addEventListener("input", handleHashtagInput);
    }

    return () => {
      if ($editor) {
        $editor.removeEventListener("input", handleHashtagInput);
      }
    };
  }, []);

  return (
    <>
      <button
        className={`flex justify-center ml-2.5 cursor-pointer ${textColor} hover:text-primary`}
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
      {showPopup && (
        <TemplateGroupPopup
          templateGroups={templateGroups}
          serachTemplate={handleTemplateNameInput}
          onEnterKeyDown={handleEnterKeyDown}
          handleTemplateSelect={handleTemplateSelect}
        />
      )}
      {showModal && (
        <ModalWrapper onModalClose={closeModal}>
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
          document.querySelector(`div[aria-labelledby='${emailEditorId}'],
             #${emailEditorId}`)!,
        )}
    </>
  );
}
