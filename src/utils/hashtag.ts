import { MutableRefObject } from "react";
import { CursorRef, Position } from "@/types";

const POPUP_SIZE = { width: 176, height: 212 };

export const getHashtagListPosition = (emailEditorId: string): Position | null => {
  const selection = window.getSelection();
  if (!selection) return null;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  const $editorContainer = document.querySelector(
    `div[aria-labelledby='${emailEditorId}'], #${emailEditorId}`,
  )!;
  const editorRect = $editorContainer.getBoundingClientRect();

  const top = rect.bottom - editorRect.top + 5;
  const left = rect.left - editorRect.left;

  if (rect.bottom + POPUP_SIZE.height >= window.innerHeight) {
    return { left: left - POPUP_SIZE.width - 10, top: top - 120 };
  }

  if (rect.left + POPUP_SIZE.width >= window.innerWidth) {
    return { left: left - POPUP_SIZE.width - 10, top };
  }

  return { left, top };
};

export const deleteHashtagBeforeCaret = (
  cursorRef: MutableRefObject<CursorRef>,
  hashtagKeyword: string,
) => {
  const selection = cursorRef.current;

  if (selection.rangeCount > 0) {
    const { range } = selection;
    const start = range.startOffset;
    const { startContainer } = range;

    const deleteRange = document.createRange();

    deleteRange.setStart(startContainer, Math.max(0, start - hashtagKeyword.length));
    deleteRange.setEnd(startContainer, start);
    deleteRange.deleteContents();

    range.setStart(startContainer, Math.max(0, start - hashtagKeyword.length));
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
  }
};
