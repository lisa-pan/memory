import "./MemoryCard.css";

export default function MemoryCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="cardImg" src={card.src} alt="card cardImg" />
        <img
          className="cardCover"
          src="/card-cover.jpg"
          alt="card cardCover"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
