import { Template, TemplateVariable } from "@/types";
import { DATE_FORMAT } from "./constants";

export const getVariableValue = (variable: string) => {
  const locale = undefined;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  switch (variable) {
    case "month.last":
      return new Date(year, month - 1).toLocaleDateString(locale, DATE_FORMAT.MONTH);
    case "month.this":
      return new Date().toLocaleDateString(locale, DATE_FORMAT.MONTH);
    case "month.next":
      return new Date(year, month + 1).toLocaleDateString(locale, DATE_FORMAT.MONTH);
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

export const extractVariables = (template: Template) => {
  const { subject, body } = template;

  const regex = /\[\{([^}]+)\}\]/g;
  const matches = new Set<string>();

  for (let match = regex.exec(subject); match !== null; match = regex.exec(subject)) {
    matches.add(match[1]);
  }

  for (let match = regex.exec(body); match !== null; match = regex.exec(body)) {
    matches.add(match[1]);
  }

  return Array.from(matches).reduce<TemplateVariable>((acc, cur) => {
    acc[cur] = getVariableValue(cur);
    return acc;
  }, {});
};

export const fillTemplateWithVariables = (
  template: Template,
  templateVariables: TemplateVariable,
): Template => {
  Object.keys(templateVariables).forEach((key) => {
    const regex = new RegExp(`\\[\\{${key}\\}\\]`, "g");
    template.body = template.body.replace(regex, templateVariables[key]);
    template.subject = template.subject.replace(regex, templateVariables[key]);
  });

  return template;
};
