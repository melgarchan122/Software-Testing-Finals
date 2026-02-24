import "../components/Button.css";

const Button = ({ Children, loading, variant = "primary", ...props }) => {
  return (
    <button className={`btn btn-${variant}`} disabled={loading} {...props}>
      {loading ? (
        <>
          <span className="spinner">Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
