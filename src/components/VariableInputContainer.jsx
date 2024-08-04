import VariableInput from "./VariableInput";

export default function VariableInputContainer({
  variables,
  handleInput,
  ApplyVariable,
}) {
  return (
    <div className="px-8 py-3">
      {Object.keys(variables).map((key) => (
        <VariableInput
          key={key}
          name={key}
          value={variables[key]}
          onInput={handleInput}
        />
      ))}
      <div className="text-right mb-1">
        <button
          type="button"
          onClick={ApplyVariable}
          className="text-white bg-primary font-medium rounded-2xl text-sm px-5 py-2.5 h-10 hover:bg-dark-primary"
        >
          등록
        </button>
      </div>
    </div>
  );
}
