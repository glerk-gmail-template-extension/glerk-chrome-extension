import { GroupTemplateInfo } from "@/types";

type TemplateListProps = {
  templates: GroupTemplateInfo[];
  onTemplateSelect: (id: number) => void;
};

export default function TemplateList({ templates, onTemplateSelect }: TemplateListProps) {
  return (
    <ul className="ml-2.5 p-0.5">
      {templates.map((template) => (
        <li
          key={template.id}
          className="text-sm text-gray-700 font-semibold py-1.5 pl-2 rounded-md truncate cursor-pointer hover:bg-gray-100"
        >
          <button onClick={() => onTemplateSelect(template.id)} className="w-full h-full text-left">
            {template.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
