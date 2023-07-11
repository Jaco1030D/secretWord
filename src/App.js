import { useCallback, useEffect, useState } from 'react';
import './App.css';

import {wordsList} from './Data/Words'

import StartScreen from './Components/StartScreen';
import Game from './Components/Game';
import GameOver from './Components/GameOver';

const stages= [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
]
function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)
  const [pickedWord, setpickedWord] = useState("")
  const [pickedCategory, setpickedCategory] = useState("")
  const [pickedLetters, setpickedLetters] = useState([])

  const [guessedLetter, setguessedLetter] = useState([])
  const [wrongLetter, setwrongLetter] = useState([])
  const [guessed, setguessed] = useState(3)
  const [score, setScore] = useState(0)
  const [numWord, setNumWord] = useState(0)

  const pickWordandCategory = useCallback( () =>{
    const categories = Object.keys(words) //da um numero pra cada categoria
    //pega a categoria
    const category = categories[Math.floor(Math.random()* Object.keys(categories).length)]
    //pega a palavra dentro da categoria
    const word = words[category][Math.floor(Math.random()* words[category].length)]
    return {word, category}
  }, [words])
  //começa o jogo
  const startgame = useCallback(() =>{
    clearStage()
    const {word, category} = pickWordandCategory();
    //criar lista de letras

    let wordLetters = word.split("")

    wordLetters = wordLetters.map((l) => l.toLowerCase())
    console.log(wordLetters)

    setpickedCategory(category)
    setpickedLetters(wordLetters)
    setpickedWord(word)

    setGameStage(stages[1].name)
  }, [pickWordandCategory])

  //verifica se a letra ta correta
  const verify = (letter) =>{
    const normalletter = letter.toLowerCase()
    
    if (guessedLetter.includes(normalletter) || wrongLetter.includes(normalletter)) {
      return;
    }
    if (pickedLetters.includes(normalletter)) {
      setguessedLetter((actualguessedLetter) => [
        ...actualguessedLetter,
        normalletter
      ] )
    } else {
      setwrongLetter((actualwrongLetter) => [
        ...actualwrongLetter,
        normalletter
      ] )

      setguessed((actualguessed) => actualguessed - 1)
    }

  }
  const clearStage = () => {
    setwrongLetter([])
    setguessedLetter([])

  }
  useEffect(() => {
    if (guessed <= 0) {
      clearStage()
      setGameStage(stages[2].name)
      
    }
  }, [guessed])
  useEffect(() =>{
    const uniqueLetters = [...new Set(pickedLetters)] //tira letras repetidas

    if (guessedLetter.length === uniqueLetters.length && gameStage===stages[1].name ) {
      setScore((a) => a +=100 )
      startgame()
 
    }

  }, [guessedLetter, pickedLetters, startgame, gameStage])
  const retry = () =>{
    setScore(0)
    setguessed(3)
    setGameStage(stages[0].name)

  }
  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startgame={startgame} />}
      {gameStage === 'game' && <Game verify={verify}  
      pickedCategory={pickedCategory} 
      pickedLetters={pickedLetters} 
      pickedWord={pickedWord}
      guessedLetter={guessedLetter}
      guessed={guessed}
      score={score} 
      wrongLetter={wrongLetter} />}

      
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
