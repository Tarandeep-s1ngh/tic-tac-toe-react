import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const initialState = ["", "", "", "", "", "", "", "", ""];

  const [gameState, setGameState] = useState(initialState);

  const [turn, setTurn] = useState(false);
  
  const [gameOver, setGameOver] = useState({over:false, draw:false});

  const cellClickHandler = (index) => {
    let stateArray = [...gameState];
    stateArray[index] = turn ? "o" : "x";
    setGameState(stateArray);
    setTurn((prev) => !prev);
  }

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
        <div className={`cell ${gameState[0]}`} onClick={() => cellClickHandler(0)}></div>
        <div className={`cell ${gameState[1]}`} onClick={() => cellClickHandler(1)}></div>
        <div className={`cell ${gameState[2]}`} onClick={() => cellClickHandler(2)}></div>
        <div className={`cell ${gameState[3]}`} onClick={() => cellClickHandler(3)}></div>
        <div className={`cell ${gameState[4]}`} onClick={() => cellClickHandler(4)}></div>
        <div className={`cell ${gameState[5]}`} onClick={() => cellClickHandler(5)}></div>
        <div className={`cell ${gameState[6]}`} onClick={() => cellClickHandler(6)}></div>
        <div className={`cell ${gameState[7]}`} onClick={() => cellClickHandler(7)}></div>
        <div className={`cell ${gameState[8]}`} onClick={() => cellClickHandler(8)}></div>
      </div>
      <div className={gameOver.over ? "result-message show" : "result-message"} id="result-message">
        <div>{giveResult()}</div>
        <button id="restart-btn" onClick={() => restartHandler()}>Restart</button>
      </div>
    </div>
  );
}

export default App;
