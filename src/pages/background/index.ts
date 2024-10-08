/// <reference types="chrome" />

import { AxiosError, AxiosResponse } from "axios";
import axios from "@/utils/axiosInstance";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fetchGroups") {
    axios
      .get(`/v1/groups${message.templateName ? `?templateName=${message.templateName}` : ""}`)
      .then((response: AxiosResponse) => {
        sendResponse({ groups: response.data });
      })
      .catch((error: AxiosError) => {
        console.error("Error fetching groups:", error);
        sendResponse({ groups: [] });
      });

    return true;
  }

  if (message.action === "fetchTemplate") {
    axios
      .get(`/v1/templates/${message.templateId}`)
      .then((response: AxiosResponse) => {
        sendResponse({ template: response.data });
      })
      .catch((error: AxiosError) => {
        console.error("Error fetching template:", error);
        sendResponse({ template: {} });
      });

    return true;
  }

  if (message.action === "fetchTemplatesWithHashtag") {
    axios
      .get(`/v1/templates/hashtag/${message.hashtag}`)
      .then((response: AxiosResponse) => {
        sendResponse({ templates: response.data });
      })
      .catch((error: AxiosError) => {
        console.error("Error fetching templates:", error);
        sendResponse({ templates: [] });
      });

    return true;
  }
});
