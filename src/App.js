import { useEffect, useState } from "react";
import "./App.css";
import { CellComponent } from "./components";

function App() {
  const initialState = ["", "", "", "", "", "", "", "", ""];
  const cellIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const [gameState, setGameState] = useState(initialState);

  const [turn, setTurn] = useState(false);
  
  const [gameOver, setGameOver] = useState({over:false, draw:false});

  const restartHandler = () => {
    setGameState(initialState);
    setTurn(false);
    setGameOver({over:false, draw:false});
  }

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        return gameState[a];
      }
    }
    return null;
  }

  const checkDraw = () => {
    return gameState.every(cell => {
      return cell === "x" || cell === "o";
  })
  }

  const giveResult = () => {
    if(gameOver.draw) {
      return "Draw!"
    }
    else {
      return turn ? "X Wins!" : "O Wins!";
  }
  }

  useEffect(()=> {
    const winner = checkWinner();
    if(winner) {
      setGameOver(prev=> ({...prev, over:true}));
    } else if(checkDraw()) {
      setGameOver(prev=> ({...prev, over:true, draw:true}))
    }
  }, [gameState])

  return (
    <div className="App">
      <div id="turn-title">{turn ? "O's Turn" : "X's Turn"}</div>
      <div className={turn ? "board o" : "board x"}>
        {cellIndex.map(idx => {
          return (
            <CellComponent gameData={{gameState: gameState, setGameState: setGameState, turn: turn, setTurn: setTurn}} index={idx} />
          )
        })}
      </div>
      <div className={gameOver.over ? "result-message show" : "result-message"} id="result-message">
        <div>{giveResult()}</div>
        <button id="restart-btn" onClick={() => restartHandler()}>Restart</button>
      </div>
    </div>
  );
}

export default App;
