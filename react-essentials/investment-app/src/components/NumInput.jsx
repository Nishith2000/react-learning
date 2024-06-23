export default function NumInput({ fieldName, onNumInputChange }) {
  return (
    <div>
      <label>{fieldName}</label>
      <input type="number" onInput={(e) => onNumInputChange(e, fieldName)} />
    </div>
  );
}
