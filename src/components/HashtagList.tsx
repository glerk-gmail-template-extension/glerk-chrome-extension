import { MutableRefObject, useEffect, useState } from "react";

import { fetchTemplatesWithHashtag } from "../utils/api";
import { deleteHashtagBeforeCaret } from "../utils/hashtag";

import { CursorRef, Template } from "../types";

type HashtagListProps = {
  hashtagKeyword: string;
  hashtagPosition: { top: number; left: number };
  onTemplateClick: (id: number) => void;
  onTemplateMouseDown: () => void;
  cursorRef: MutableRefObject<CursorRef>;
};

export default function HashtagList({
  hashtagKeyword,
  hashtagPosition,
  onTemplateClick,
  onTemplateMouseDown,
  cursorRef,
}: HashtagListProps) {
  const [templateList, setTemplateList] = useState<Template[]>([]);

  useEffect(() => {
    const fetchTemplate = async (keyword: string) => {
      const data = await fetchTemplatesWithHashtag(keyword);
      setTemplateList(data);
    };

    const keyword = hashtagKeyword.substring(1);

    if (keyword.trim() !== "") {
      fetchTemplate(keyword);
    }
  }, [hashtagKeyword]);

  return (
    <div
      style={{
        top: `${hashtagPosition.top + 5}px`,
        left: `${hashtagPosition.left}px`,
      }}
      className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow glerk-template w-44"
    >
      <p className="px-4 py-2 text-sm text-gray-400">
        {templateList.length > 0 ? "템플릿 목록" : "템플릿 목록이 없습니다."}
      </p>
      {templateList.length > 0 && (
        <ul className="py-2 overflow-y-auto text-sm text-gray-700 max-h-44">
          {templateList.map((template) => (
            <li key={template.id} className="px-2">
              <button
                className="block w-full p-2 text-sm font-semibold text-left text-gray-700 rounded-md cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  deleteHashtagBeforeCaret(cursorRef, hashtagKeyword);
                  onTemplateClick(template.id);
                }}
                onMouseDown={onTemplateMouseDown}
                title={`${template.hashtag}\n${template.name}`}
              >
                <p className="mb-1 text-xs font-semibold text-gray-400 truncate">
                  {template.hashtag}
                </p>
                <p className="truncate">{template.name}</p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
