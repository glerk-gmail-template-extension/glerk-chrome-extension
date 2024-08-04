export const fetchTemplate = (templateId) => {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage(
        { action: "fetchTemplate", templateId },
        (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response.template);
          }
        },
      );
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchGroups = (templateName) => {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage(
        { action: "fetchGroups", templateName },
        (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response.groups);
          }
        },
      );
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchTemplatesWithHashtag = (hashtag) => {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage(
        { action: "fetchTemplatesWithHashtag", hashtag },
        (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response.templates);
          }
        },
      );
    } catch (error) {
      reject(error);
    }
  });
};
