import Player from "./components/Player";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");

  function onSelectSquare() {
    setActivePlayer((prevActivePlayer) =>
      prevActivePlayer === "X" ? "O" : "X"
    );
  }

  return (
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player
          initialName="player-1"
          symbol="X"
          isActive={activePlayer === "X"}
        />
        <Player
          initialName="player-2"
          symbol="Y"
          isActive={activePlayer === "O"}
        />
      </ol>
      <GameBoard activePlayer={activePlayer} onSelectSquare={onSelectSquare} />
    </div>
  );
}

export default App;
