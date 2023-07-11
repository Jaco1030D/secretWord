import React from 'react'
import "./StartScreen.css"
const StartScreen = ({startgame}) => {
  return (
    <div className="start" >
        <h1>Secret Word</h1>
        <p>Clique abaixo para continuar</p>
        <button onClick={startgame} >Começar o jogo</button>
    </div>
  )
}

export default StartScreen