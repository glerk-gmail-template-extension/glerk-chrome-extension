import React from "react";
import ReactDOM from "react-dom/client";

import { EMIAL_WINDOW_PATH, TOOLBAR_PATH } from "@/utils/constants";
import App from "./App";

import "@/index.css";

const createIconButton = () => {
  const $iconButton = document.createElement("td");
  $iconButton.classList.add("relative", "template-button", "glerk-template");
  return $iconButton;
};

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node instanceof Element && node.querySelector(EMIAL_WINDOW_PATH)) {
        const $mailContainers = document.querySelectorAll(EMIAL_WINDOW_PATH);

        $mailContainers.forEach(($mailContainer) => {
          const emailEditorId =
            $mailContainer.getAttribute("role") === "dialog"
              ? $mailContainer.getAttribute("aria-labelledby")
              : $mailContainer.id;

          if (emailEditorId === null) return;

          const $toolbar = $mailContainer.querySelector(TOOLBAR_PATH);

          if ($toolbar && !$toolbar.querySelector(".template-button")) {
            const $iconButton = createIconButton();
            $toolbar.children[0].insertAdjacentElement("afterend", $iconButton);

            ReactDOM.createRoot($iconButton).render(
              <React.StrictMode>
                <App emailEditorId={CSS.escape(emailEditorId)} />
              </React.StrictMode>,
            );
          }
        });
      }
    });
  });
});

const targetNode = document.body;

const config = { childList: true, subtree: true };

observer.observe(targetNode, config);
