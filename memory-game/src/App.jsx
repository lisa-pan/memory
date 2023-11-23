import "./App.css";
import { useEffect, useState } from "react";
import MemoryCard from "./Components/MemoryCard";

const cardImgs = [
  { src: "/amadeo.jpg", matched: false },
  { src: "/benjamin.jpg", matched: false },
  { src: "/bunnies.jpg", matched: false },
  { src: "/chkn.jpg", matched: false },
  { src: "/gandalf.jpg", matched: false },
  { src: "/luna.jpg", matched: false },
  { src: "/mirko.jpg", matched: false },
  { src: "/navanita.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImgs, ...cardImgs] //spread syntax ...
      .sort(() => 0.5 - Math.random())
      .map((card) => ({ ...card, id: Math.random() }));
    setFirstChoice(null);
    setSecondChoice(null);
    setCards(shuffledCards);
  };

  // handle choice
  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  // compare choices
  //useEffect is going to fire when the component first loads! and then again whenever a dependency [] change
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.src === secondChoice.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      } else {
        console.log("nope");
      }
      setTimeout(() => resetChoice(), 1000);
    }
  }, [firstChoice, secondChoice]);

  const resetChoice = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Memory</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <MemoryCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === firstChoice || card === secondChoice || card.matched
            }
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
