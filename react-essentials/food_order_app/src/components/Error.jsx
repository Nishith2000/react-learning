export default function Error({ title, message }) {
  return (
    <div className="error">
      <div className="error-box">
        <h2 className="error-title">{title}</h2>
        <p className="error-message">{message}</p>
      </div>
    </div>
  );
}
