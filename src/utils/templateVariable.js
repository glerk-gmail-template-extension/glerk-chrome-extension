import DATE_FORMAT from "./constants";

export const getVariableValue = (variable) => {
  const locale = undefined;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  switch (variable) {
    case "month.last":
      return new Date(year, month - 1).toLocaleDateString(
        locale,
        DATE_FORMAT.MONTH,
      );
    case "month.this":
      return new Date().toLocaleDateString(locale, DATE_FORMAT.MONTH);
    case "month.next":
      return new Date(year, month + 1).toLocaleDateString(
        locale,
        DATE_FORMAT.MONTH,
      );
    case "date.today.long":
      return new Date().toLocaleDateString(locale, DATE_FORMAT.LONG);
    case "date.today.short":
      return new Date().toLocaleDateString(locale, DATE_FORMAT.SHORT);
    case "date.tomorrow.long": {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      return tomorrow.toLocaleDateString(locale, DATE_FORMAT.LONG);
    }
    case "date.tomorrow.short": {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      return tomorrow.toLocaleDateString(locale, DATE_FORMAT.SHORT);
    }
    case "date.nextMonday.long": {
      const nextMonday = new Date(today);
      nextMonday.setDate(today.getDate() + ((8 - today.getDay()) % 7 || 7));
      return nextMonday.toLocaleDateString(locale, DATE_FORMAT.LONG);
    }
    case "date.nextMonday.short": {
      const nextMonday = new Date(today);
      nextMonday.setDate(today.getDate() + ((8 - today.getDay()) % 7 || 7));
      return nextMonday.toLocaleDateString(locale, DATE_FORMAT.SHORT);
    }
    case "date.lastWeek.long": {
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      return lastWeek.toLocaleDateString(locale, DATE_FORMAT.LONG);
    }
    case "date.lastWeek.short": {
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      return lastWeek.toLocaleDateString(locale, DATE_FORMAT.SHORT);
    }
    case "date.nextWeek.long": {
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      return nextWeek.toLocaleDateString(locale, DATE_FORMAT.LONG);
    }
    case "date.nextWeek.short": {
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      return nextWeek.toLocaleDateString(locale, DATE_FORMAT.SHORT);
    }
    default:
      return "";
  }
};

export const extractVariables = (template) => {
  const { subject } = template;
  const { body } = template;

  const regex = /\[\{([^}]+)\}\]/g;
  const matches = new Set();

  for (
    let match = regex.exec(subject);
    match !== null;
    match = regex.exec(subject)
  ) {
    matches.add(match[1]);
  }

  for (let match = regex.exec(body); match !== null; match = regex.exec(body)) {
    matches.add(match[1]);
  }

  return Array.from(matches).reduce((acc, cur) => {
    acc[cur] = getVariableValue(cur);
    return acc;
  }, {});
};

const enterEvent = new KeyboardEvent("keydown", {
  key: "Enter",
  keyCode: 13,
  code: "Enter",
  which: 13,
  bubbles: true,
  cancelable: true,
});

export const applyTemplate = (emailEditorId, template) => {
  const $emailEditor =
    document.querySelector(`div[aria-labelledby='${emailEditorId}']`) ||
    document;

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

  const $body = $emailEditor.querySelector(
    "div[g_editable='true'][role='textbox'][contenteditable='true']",
  );

  $body.innerHTML += template.body;
};
