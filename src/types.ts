export type Template = {
  id: number;
  name: string;
  hashtag: string;
  recipients: [];
  ccList: [];
  bccList: [];
  subject: string;
  body: string;
};

export type TemplateVariable = { [key: string]: string };

export type CursorRef = {
  rangeCount: number;
  range: Range;
  removeAllRanges: () => void;
  addRange: (range: Range) => void;
};

export type Position = {
  left: number;
  top: number;
};

export type GroupTemplateInfo = {
  id: number;
  name: string;
  createdAt: string;
};

export type Group = {
  id: number;
  name: string;
  templates: GroupTemplateInfo[];
};

export type User = {
  username: string;
  profileUrl: string;
  email: string;
};
