import "./card.css";
import iconComputer from "../assets/computer.svg";
const Card = (props) => {
  const { image, title, materi, quiz, bgColor } = props;

  return (
    <div className="card">
      <div className="card-header" style={{ backgroundColor: bgColor }}>
        <img src={image} alt={title} />
      </div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-info">
          {materi} Materi | {quiz} Quiz
        </p>

        <button className="card-btn">View</button>
      </div>
    </div>
  );
};

export default Card;
