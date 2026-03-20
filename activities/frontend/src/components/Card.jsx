import "../components/Card.css";

const Card = ({ title, children, className, ...props }) => {
  return (
    <div className={`card-container ${className || ""}`}>
      <div className="card" {...props}>
        {title && <h2 className="card-title">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Card;
