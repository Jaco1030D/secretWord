import React, { useState, useRef } from 'react'
import './Game.css'
const Game = ({verify,
    pickedCategory,
    pickedLetters,
    pickedWord,
    guessedLetter,
    guessed,
    score,
    wrongLetter}) => {
    const [letter, setLetter]= useState("");
    const refletter = useRef(null)
    const handleSubmit = (e) =>{
        e.preventDefault()

        verify(letter)
        setLetter("")
        refletter.current.focus()
    }
  return (
    <div className="game">
        <p className="points">
            <span>Pontuação: {score}</span>
        </p>
        <h1>Adivinhe a palavra</h1>
        <h3 className="tip">
            Dica sobre a palavra <span>{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {guessed} tentativas</p>
        <div className="wordContainer">

            {pickedLetters.map((letter, i) =>(
                guessedLetter.includes(letter) ? (
                    <span key={i} className="letter">{letter}</span>

                ) : (
                    <span key={i} className="blankSquare"></span>

                )
            ))}
        </div>
        <div className="letterContainer">
            <p>Tente adivinhar uma letra da palavra</p>
            <form autocomplete="off" onSubmit={handleSubmit} >
                <input type="text" name="letter" maxLength="1" ref={refletter}  required onChange={(e) => setLetter(e.target.value)  } value={letter} />
                <button>Jogar</button>
            </form>
        </div>
        <div className="wrongLettersContainer">
            <p>Letras ja utilizadas</p>
            {wrongLetter.map((letter, i) => (
                <span key={i} >{letter}, </span>
            ))}
        </div>
    </div>
  )
}

export default Game