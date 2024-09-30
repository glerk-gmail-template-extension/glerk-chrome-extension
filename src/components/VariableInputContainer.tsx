import { TemplateVariable } from "../types";
import VariableInput from "./VariableInput";

type VariableInputContainerProps = {
  variables: TemplateVariable;
  handleInput: (name: string, value: string) => void;
  applyVariable: () => void;
};

export default function VariableInputContainer({
  variables,
  handleInput,
  applyVariable,
}: VariableInputContainerProps) {
  return (
    <div className="px-8 py-3">
      {Object.keys(variables).map((key) => (
        <VariableInput key={key} name={key} value={variables[key]} onInput={handleInput} />
      ))}
      <div className="mb-1 text-right">
        <button
          type="button"
          onClick={applyVariable}
          className="text-white bg-primary font-medium rounded-2xl text-sm px-5 py-2.5 h-10 hover:bg-dark-primary"
        >
          등록
        </button>
      </div>
    </div>
  );
}
