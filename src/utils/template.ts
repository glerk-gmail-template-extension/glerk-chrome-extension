import { MutableRefObject } from "react";
import { CursorRef, Template } from "../types";

const enterEvent = new KeyboardEvent("keydown", {
  key: "Enter",
  keyCode: 13,
  code: "Enter",
  which: 13,
  bubbles: true,
  cancelable: true,
});

const insertTextAtCursor = (
  $editor: HTMLElement,
  body: string,
  cursorRef: MutableRefObject<CursorRef>,
) => {
  const selection = cursorRef.current;

  if (selection?.rangeCount > 0 && $editor.contains(selection.range.commonAncestorContainer)) {
    const { range } = selection;
    range.deleteContents();

    const $div = document.createElement("div");
    $div.innerHTML = body;

    const frag = document.createDocumentFragment();
    frag.appendChild($div);
    range.insertNode(frag);

    const lastNode = frag.lastChild;

    if (lastNode) {
      range.setStartAfter(lastNode);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  } else {
    $editor.innerHTML += body;
  }
};

export const applyTemplate = (
  emailEditorId: string,
  template: Template,
  cursorRef: MutableRefObject<CursorRef>,
) => {
  const $emailEditor =
    document.querySelector(`div[aria-labelledby='${emailEditorId}'], #${emailEditorId}`) ||
    document;

  const $emailInputs: HTMLFormElement = $emailEditor.querySelector(
    "div[role='region'] table[role='presentation'] form",
  )!;

  const templateItems: string[][] = [
    template.recipients,
    template.ccList,
    template.bccList,
    [template.subject],
  ];

  const $emailButtons: NodeListOf<HTMLElement> = $emailInputs.querySelectorAll("span[role='link']");

  $emailButtons.forEach(($emailOpenButton: HTMLElement) => {
    if (
      $emailOpenButton.parentElement &&
      $emailOpenButton.parentElement.tagName.toLocaleLowerCase() === "span"
    ) {
      $emailOpenButton.click();
    }
  });

  const $inputFields: NodeListOf<HTMLInputElement> = $emailInputs.querySelectorAll(
    'input:not([type="hidden"])',
  );

  $inputFields.forEach(($input, index) => {
    templateItems[index].forEach((item) => {
      if (item) {
        $input.value = item;
        $input.dispatchEvent(enterEvent);
      }
    });
  });

  const $editor: HTMLElement | null = $emailEditor.querySelector(
    "div[g_editable='true'][role='textbox'][contenteditable='true']",
  );

  if ($editor) {
    insertTextAtCursor($editor, template.body, cursorRef);
  }
};

export const storeCurrentCursor = (cursorRef: MutableRefObject<CursorRef>) => {
  const selection = window.getSelection();

  if (selection && selection.rangeCount > 0) {
    cursorRef.current = {
      rangeCount: selection.rangeCount,
      range: selection.getRangeAt(0).cloneRange(),
      removeAllRanges: () => selection.removeAllRanges(),
      addRange: (range) => selection.addRange(range),
    };
  }
};
