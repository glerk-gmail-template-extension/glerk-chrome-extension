export const getHashtagListPosition = (emailEditorId) => {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  const $editorContainer = document.querySelector(
    `div[aria-labelledby='${emailEditorId}'], #${emailEditorId}`,
  );
  const editorRect = $editorContainer.getBoundingClientRect();

  const top = rect.bottom - editorRect.top + 5;
  const left = rect.left - editorRect.left;

  const popupSize = { width: 176, height: 212 };

  if (rect.bottom + popupSize.height >= window.innerHeight) {
    return { left: left - popupSize.width - 10, top: top - 120 };
  }

  if (rect.left + popupSize.width >= window.innerWidth) {
    return { left: left - popupSize.width - 10, top };
  }

  return { left, top };
};

export const deleteHashtagBeforeCaret = (cursorRef, hashtagKeyword) => {
  const selection = cursorRef.current;

  if (selection.rangeCount > 0) {
    const { range } = selection;
    const start = range.startOffset;
    const { startContainer } = range;

    const deleteRange = document.createRange();

    deleteRange.setStart(
      startContainer,
      Math.max(0, start - hashtagKeyword.length),
    );
    deleteRange.setEnd(startContainer, start);
    deleteRange.deleteContents();

    range.setStart(startContainer, Math.max(0, start - hashtagKeyword.length));
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
  }
};
