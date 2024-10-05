import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

import { fetchGroups } from "@/utils/api";
import { Group } from "@/types";
import GroupList from "./GroupList";
import SearchIcon from "./SearchIcon";
import EmptyTemplate from "./EmptyTemplate";

type TemplateGroupPopupProps = {
  onTemplateSelect: (id: number) => void;
};
export default function TemplateGroupPopup({ onTemplateSelect }: TemplateGroupPopupProps) {
  const [groups, setGroups] = useState<Group[]>([]);

  const searchGroupsByTemplateName = async (templateName: string = "") => {
    setGroups(await fetchGroups(templateName));
  };

  useEffect(() => {
    searchGroupsByTemplateName();
  }, []);

  const debouncedSearch = useCallback(
    debounce((templateName: string) => {
      searchGroupsByTemplateName(templateName);
    }, 300),
    [],
  );

  const handleTemplateNameInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTemplateName = event.target.value;
    debouncedSearch(newTemplateName);
  };

  return (
    <div className="absolute z-10 mb-1 overflow-y-auto transform bg-white border-t border-gray-200 rounded-md shadow-md template-popup -translate-x-1/3 bottom-7 w-60 max-h-60">
      <div className="relative box-border p-2.5 overflow-x-hidden">
        <input
          id="search-template"
          type="search"
          autoComplete="off"
          onClick={(event) => event.stopPropagation()}
          onInput={handleTemplateNameInput}
          className="w-full p-1.5 pl-7 border text-gray-600 border-gray-200 rounded-lg text-sm outline-none"
        />
        <span className="absolute text-gray-400 top-5 left-5">
          <SearchIcon />
        </span>
      </div>
      {groups && groups.length > 0 ? (
        <GroupList groups={groups} onTemplateSelect={onTemplateSelect} />
      ) : (
        <EmptyTemplate />
      )}
    </div>
  );
}
