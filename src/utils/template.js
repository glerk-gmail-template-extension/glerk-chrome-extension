const enterEvent = new KeyboardEvent("keydown", {
  key: "Enter",
  keyCode: 13,
  code: "Enter",
  which: 13,
  bubbles: true,
  cancelable: true,
});

const insertTextAtCursor = ($editor, body, cursorRef) => {
  const selection = cursorRef.current;

  if (
    selection?.rangeCount > 0 &&
    $editor.contains(selection.range.commonAncestorContainer)
  ) {
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

export const applyTemplate = (emailEditorId, template, cursorRef) => {
  const $emailEditor =
    document.querySelector(
      `div[aria-labelledby='${emailEditorId}'], #${emailEditorId}`,
    ) || document;

  const $emailInputs = $emailEditor.querySelector(
    "div[role='region'] table[role='presentation'] form",
  );

  const templateItems = [
    template.recipients,
    template.ccList,
    template.bccList,
    [template.subject],
  ];

  const $emailButtons = $emailInputs.querySelectorAll("span[role='link']");

  $emailButtons.forEach(($emailOpenButton) => {
    if ($emailOpenButton.parentElement.tagName.toLocaleLowerCase() === "span") {
      $emailOpenButton.click();
    }
  });

  const $inputFields = $emailInputs.querySelectorAll(
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

  const $editor = $emailEditor.querySelector(
    "div[g_editable='true'][role='textbox'][contenteditable='true']",
  );

  insertTextAtCursor($editor, template.body, cursorRef);
};

export const storeCurrentCursor = (cursorRef) => {
  const selection = window.getSelection();

  if (selection.rangeCount > 0) {
    cursorRef.current = {
      rangeCount: selection.rangeCount,
      range: selection.getRangeAt(0),
      removeAllRanges: () => selection.removeAllRanges(),
      addRange: (range) => selection.addRange(range),
    };
  }
};
