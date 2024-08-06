import React from "react";

import TemplateList from "./TemplateList";

export default function GroupList({ templateGroups, handleTemplateSelect }) {
  return (
    <ul className="text-sm text-gray-400 font-normal p-2.5 px-4">
      {templateGroups.map((group) => {
        return (
          <React.Fragment key={group.id}>
            <li className="my-1 text-sm truncate">{`📂 ${group.name}`}</li>
            {group.templates.length > 0 && (
              <TemplateList
                templates={group.templates}
                onTemplateSelect={handleTemplateSelect}
              />
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
}
