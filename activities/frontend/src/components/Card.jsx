import "../components/Card.css";

const Card = ({}) => {
  return (
    <div className="card-container">
      <div className="card">
        (title && <h2 className="card-title"></h2>){children}
      </div>
    </div>
  );
};
export default Card;
