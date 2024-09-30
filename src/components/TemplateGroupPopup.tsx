import GroupList from "./GroupList";
import SearchIcon from "./SearchIcon";
import EmptyTemplate from "./EmptyTemplate";

import { Group } from "../types";

type TemplateGroupPopupProps = {
  templateGroups: Group[];
  serachTemplate: (value: string) => void;
  onEnterKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleTemplateSelect: (id: number) => void;
};
export default function TemplateGroupPopup({
  templateGroups,
  serachTemplate,
  onEnterKeyDown,
  handleTemplateSelect,
}: TemplateGroupPopupProps) {
  return (
    <div className="absolute z-10 mb-1 overflow-y-auto transform bg-white border-t border-gray-200 rounded-md shadow-md template-popup -translate-x-1/3 bottom-7 w-60 max-h-60">
      <div className="relative box-border p-2.5 overflow-x-hidden">
        <input
          id="search-template"
          type="search"
          autoComplete="off"
          onClick={(event) => event.stopPropagation()}
          onInput={(event: React.FormEvent<HTMLInputElement>) =>
            serachTemplate(event.currentTarget.value)
          }
          onKeyDown={onEnterKeyDown}
          className="w-full p-1.5 pl-7 border text-gray-600 border-gray-200 rounded-lg text-sm outline-none"
        />
        <span className="absolute text-gray-400 top-5 left-5">
          <SearchIcon />
        </span>
      </div>
      {templateGroups && templateGroups.length > 0 ? (
        <GroupList templateGroups={templateGroups} onTemplateSelect={handleTemplateSelect} />
      ) : (
        <EmptyTemplate />
      )}
    </div>
  );
}
