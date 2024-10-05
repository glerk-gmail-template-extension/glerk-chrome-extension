import React from "react";

import { Group } from "@/types";
import TemplateList from "./TemplateList";

type GroupList = {
  groups: Group[];
  onTemplateSelect: (id: number) => void;
};

export default function GroupList({ groups, onTemplateSelect }: GroupList) {
  return (
    <ul className="text-sm text-gray-400 font-normal p-2.5 px-4">
      {groups.map((group) => {
        return (
          <React.Fragment key={group.id}>
            <li className="my-1 text-sm truncate">{`📂 ${group.name}`}</li>
            {group.templates.length > 0 && (
              <TemplateList templates={group.templates} onTemplateSelect={onTemplateSelect} />
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
}
