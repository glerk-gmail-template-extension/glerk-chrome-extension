import { Group, Template } from "../types";

export const fetchTemplate = (templateId: number): Promise<Template> => {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage({ action: "fetchTemplate", templateId }, (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(response.template);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchGroups = (templateName: string): Promise<Group[]> => {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage({ action: "fetchGroups", templateName }, (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(response.groups);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchTemplatesWithHashtag = (hashtag: string): Promise<Template[]> => {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage({ action: "fetchTemplatesWithHashtag", hashtag }, (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(response.templates);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
