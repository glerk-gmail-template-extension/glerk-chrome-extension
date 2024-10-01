import GroupList from "./GroupList";
import SearchIcon from "./SearchIcon";
import EmptyTemplate from "./EmptyTemplate";

import { Group } from "../types";

type TemplateGroupPopupProps = {
  groups: Group[];
  onTemplateNameInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTemplateSelect: (id: number) => void;
};
export default function TemplateGroupPopup({
  groups,
  onTemplateNameInput,
  onTemplateSelect,
}: TemplateGroupPopupProps) {
  return (
    <div className="absolute z-10 mb-1 overflow-y-auto transform bg-white border-t border-gray-200 rounded-md shadow-md template-popup -translate-x-1/3 bottom-7 w-60 max-h-60">
      <div className="relative box-border p-2.5 overflow-x-hidden">
        <input
          id="search-template"
          type="search"
          autoComplete="off"
          onClick={(event) => event.stopPropagation()}
          onInput={onTemplateNameInput}
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
