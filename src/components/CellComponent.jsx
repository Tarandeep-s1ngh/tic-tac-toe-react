import React from 'react'

export const CellComponent = ({gameData, index}) => {

  const {gameState, setGameState, turn, setTurn} = gameData;

  const cellClickHandler = (index) => {
    let stateArray = [...gameState];
    stateArray[index] = turn ? "o" : "x";
    setGameState(stateArray);
    setTurn((prev) => !prev);
  }

  return (
    <div key={index} className={`cell ${gameState[index]}`} onClick={() => cellClickHandler(index)}></div>
  )
}
