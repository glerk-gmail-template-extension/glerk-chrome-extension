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

const DATE_FORMAT: DateFormat = {
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

export default DATE_FORMAT;
