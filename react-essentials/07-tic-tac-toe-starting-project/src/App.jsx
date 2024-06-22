import Player from "./components/Player";
import { useState } from "react";
import Log from "./components/Log.jsx";
import GameBoard from "./components/Gameboard.jsx";
import { WINNING_COMBINATIONS } from "./data/winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
  X: "Player-1",
  O: "Player-2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function getGameBoard(turns) {
  // create deep copy of gameboard to prevent any bugs
  const gameBoard = [...INITIAL_GAME_BOARD.map((innerArr) => [...innerArr])];

  // Update Gameboard
  for (const turn of turns) {
    const { square, activePlayer } = turn;
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = activePlayer;
  }
  return gameBoard;
}

function findWinner(gameBoard, turns) {
  let winningPlayer;
  if (turns.length > 0) {
    for (const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol =
        gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol =
        gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol =
        gameBoard[combination[2].row][combination[2].column];

      if (
        firstSquareSymbol &&
        firstSquareSymbol === secondSquareSymbol &&
        secondSquareSymbol === thirdSquareSymbol
      ) {
        winningPlayer = firstSquareSymbol;
      }
    }
  }
  return winningPlayer;
}

function getActivePlayer(gameTurns) {
  if (gameTurns.length > 0) {
    return gameTurns[0].activePlayer === "X" ? "O" : "X";
  } else {
    return "X";
  }
}

function App() {
  const [turns, setGameTurns] = useState([]);
  const [playerMapping, setPlayerMapping] = useState({...PLAYERS});
  const activePlayer = getActivePlayer(turns);
  const gameBoard = getGameBoard(turns);

  // Find if any player won
  const winningPlayer = findWinner(gameBoard, turns);

  // Check if draw has occurred
  const hasDrawn = turns.length === 9;

  // Check if game is over
  const isGameOver = hasDrawn || winningPlayer !== undefined;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const newActivePlayer = getActivePlayer(prevTurns);
      const currTurn = {
        square: {
          rowIndex,
          colIndex,
        },
        activePlayer: newActivePlayer,
      };
      const newTurns = [currTurn, ...prevTurns];
      return newTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function updatePlayerMapping(playerSymbol, playerName) {
    setPlayerMapping({
      ...playerMapping,
      [playerSymbol]: playerName,
    });
  }

  return (
    <main>
      <div id="game-container">
        {isGameOver && (
          <GameOver
            winner={winningPlayer && playerMapping[winningPlayer]}
            onRestart={handleRestart}
          />
        )}
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            updatePlayerMapping={updatePlayerMapping}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            updatePlayerMapping={updatePlayerMapping}
          />
        </ol>
        <GameBoard
          handleSelectSquare={handleSelectSquare}
          gameBoard={gameBoard}
        />
      </div>
      <Log turns={turns} />
    </main>
  );
}

export default App;
