import GroupList from "./GroupList";
import SearchIcon from "./SearchIcon";
import EmptyTemplate from "./EmptyTemplate";

export default function TemplateGroupPopup({
  templateGroups,
  serachTemplate,
  onEnterKeyDown,
  handleTemplateSelect,
}) {
  return (
    <div className="template-popup absolute transform -translate-x-1/3 bottom-7 w-60 max-h-60 mb-1 bg-white rounded-md border-t border-gray-200 shadow-md overflow-y-auto z-10">
      <div className="relative box-border p-2.5 overflow-x-hidden">
        <input
          id="search-template"
          type="search"
          autoComplete="off"
          onClick={(event) => event.stopPropagation()}
          onInput={(event) => serachTemplate(event.target.value)}
          onKeyDown={onEnterKeyDown}
          className="w-full p-1.5 pl-7 border text-gray-600 border-gray-200 rounded-lg text-sm outline-none"
        />
        <span className="absolute top-5 left-5 text-gray-400">
          <SearchIcon />
        </span>
      </div>
      {templateGroups && templateGroups.length > 0 ? (
        <GroupList
          templateGroups={templateGroups}
          handleTemplateSelect={handleTemplateSelect}
        />
      ) : (
        <EmptyTemplate />
      )}
    </div>
  );
}
