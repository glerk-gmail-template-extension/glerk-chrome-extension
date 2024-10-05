type DateFormat = {
  MONTH: {
    month: "long";
  };
  LONG: {
    year: "numeric";
    month: "long";
    day: "numeric";
  };
  SHORT: {
    year: "2-digit";
    month: "2-digit";
    day: "2-digit";
  };
};

export const DATE_FORMAT: DateFormat = {
  MONTH: {
    month: "long",
  },
  LONG: {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
  SHORT: {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  },
};

export const EDITOR_PATH = "div[g_editable='true'][role='textbox'][contenteditable='true']";
export const TOOLBAR_PATH = "table[role='presentation'] table tbody table[role='group'] tbody tr";
export const EMIAL_WINDOW_PATH = "div[role='dialog'], div[role='region']";
