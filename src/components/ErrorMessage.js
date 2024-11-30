import "./ErrorMessage.css";

export default function ErrorMessage({ children }) {
  return (
    <div className="error">
      {children.split("\n").map((msg, idx) => (
        <p key={idx}>{msg}</p>
      ))}
    </div>
  );
}
