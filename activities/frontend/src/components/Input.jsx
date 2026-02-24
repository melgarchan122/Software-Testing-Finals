import "../components/Input.css";

const Input = ({ label, error, ...props }) => {
  return (
    <div className="input-group">
      {label && <label className="input-label"></label>}
      <input className={`inputfield ${error ? "input-error" : ""}`}>
        {...props}
      </input>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

<input></input>;
