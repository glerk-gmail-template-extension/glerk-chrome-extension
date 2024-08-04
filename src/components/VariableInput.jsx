export default function VariableInput({ name, value, onInput }) {
  return (
    <div className="relative w-full py-2">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-dark-gray"
      >
        {name}
        <input
          type="text"
          id={name}
          name={name}
          defaultValue={value}
          onInput={(event) => onInput(name, event.target.value)}
          className="border border-stroke text-dark-gray focus:border-primary text-sm rounded-lg block w-full px-2.5 py-3 mt-1.5 appearance-none focus:outline-none"
          autoComplete="off"
        />
      </label>
    </div>
  );
}
