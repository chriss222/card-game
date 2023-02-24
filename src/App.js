import "./styles.css";
import { useState, useEffect, useRef } from "react";
import Odds from "./Odds";

export default function App() {
  const cardSpolight = useRef();
  const cards = [
    "0x0001F0A2",
    "0x0001F0C3",
    "0x0001F0B4",
    "0x0001F0A5",
    "0x0001F0C6",
    "0x0001F0D7",
    "0x0001F0D8",
    "0x0001F0B9",
    "0x0001F0AA",
    "0x0001F0AB",
    "0x0001F0DD",
    "0x0001F0CE",
    "0x0001F0D1"
  ];

  const generateCard = () => {
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    return randomCard;
  };

  const [card, setCard] = useState(generateCard());
  const [gameState, setGameState] = useState(true);
  const [gameInfo, setGameInfo] = useState(
    "Will the next card be higher or lower?"
  );

  useEffect(() => {
    cardSpolight.current.className = "";
    if (card && gameState) {
      cardSpolight.current.classList.add("winner");
    } else {
      cardSpolight.current.classList.add("loser");
    }
  }, [card, gameState]);

  const game = (e) => {
    if (gameState && e.target.className === "higher") {
      return click("higher");
    }
    if (gameState && e.target.className === "lower") {
      return click("lower");
    }
  };

  const restartGame = () => {
    setGameState(true);
    setCard(generateCard());
    setGameInfo("New game");
  };

  const click = (choice) => {
    const randomCard = generateCard();
    setCard(randomCard);
    if (cards.indexOf(card) < cards.indexOf(randomCard)) {
      if (choice === "higher") {
        setGameInfo(
          `${String.fromCodePoint(
            randomCard
          )} is higher than ${String.fromCodePoint(card)}, continue game`
        );
      } else {
        setGameInfo(
          `${String.fromCodePoint(
            randomCard
          )} is higher than ${String.fromCodePoint(card)}, you lost`
        );
        setGameState(false);
      }
    } else if (cards.indexOf(card) > cards.indexOf(randomCard)) {
      if (choice === "higher") {
        setGameInfo(
          `${String.fromCodePoint(
            randomCard
          )} is higher than ${String.fromCodePoint(card)}, you lost`
        );
        setGameState(false);
      } else {
        setGameInfo(
          `${String.fromCodePoint(
            randomCard
          )} is lower than ${String.fromCodePoint(card)}, continue game`
        );
      }
    } else {
      setGameInfo("Draw");
    }
  };

  return (
    <div className="App">
      <div className="info">
        <h1 className="gameInfo">{gameInfo}</h1>
      </div>
      <div>
        <h1 key={card} ref={cardSpolight} className={""}>
          <span>{String.fromCodePoint(card)}</span>
        </h1>
      </div>
      <div className={"gameButtons"}>
        <button className={"higher"} onClick={(e) => game(e)}>
          Higher
        </button>
        <button className={"lower"} onClick={(e) => game(e)}>
          Lower
        </button>
      </div>
      <Odds card={card} cards={cards} />
      <div className={"restart"}>
        <button onClick={() => restartGame()}>Restart</button>
      </div>
    </div>
  );
}
