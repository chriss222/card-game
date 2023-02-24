import { useEffect, useState } from "react";

export default function Odds({ card, cards }) {
  const [higherOdds, setHigherOdds] = useState();
  const [lowerOdds, setLowerOdds] = useState();

  useEffect(() => {
    calculateOdds();
  }, [cards]);

  const calculateOdds = () => {
    const lO = (
      cards.slice(0, cards.indexOf(card)).length / cards.length
    ).toFixed(2);
    const hO = (
      cards.slice(cards.indexOf(card), cards[cards.length - 1]).length /
      cards.length
    ).toFixed(2);
    setHigherOdds(hO);
    setLowerOdds(lO);
  };

  console.log(cards.slice(0, cards.indexOf(card)).length / cards.length);
  return (
    <div className="odds">
      <p className="higher-odds">{higherOdds} higher odds</p>
      <p className="lower-odds">{lowerOdds} lower odds</p>
    </div>
  );
}
