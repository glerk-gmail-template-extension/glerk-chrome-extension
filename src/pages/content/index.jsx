import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "../../index.css";

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (
        node.nodeType === 1 &&
        node.querySelector("div[role='dialog'], div[role='region']")
      ) {
        const $mailContainers = document.querySelectorAll(
          "div[role='dialog'], div[role='region']",
        );

        $mailContainers.forEach(($mailContainer) => {
          const containerId = $mailContainer.getAttribute("aria-labelledby");

          if (containerId === null) return;

          const $toolbar = $mailContainer.querySelector(
            "table[role='presentation'] table tbody table[role='group'] tbody tr",
          );

          if ($toolbar && !$toolbar.querySelector(".template-button")) {
            const $iconButton = document.createElement("td");

            $iconButton.classList.add("glerk-template");
            $iconButton.classList.add("relative");
            $iconButton.classList.add("template-button");
            $toolbar.children[0].insertAdjacentElement("afterend", $iconButton);

            ReactDOM.createRoot($iconButton).render(
              <React.StrictMode>
                <App containerId={containerId} />
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
