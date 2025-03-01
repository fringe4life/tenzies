
import { useEffect, useState } from 'react'
import './App.css'
import Dice from './components/Dice'
import Button from './components/Button'
import { getRandomRoll, type DieRoll } from './util'
import { nanoid } from 'nanoid'
import Difficulty from './components/Difficulty'
import Info from './components/Info'

type IndividualDiceState = {
  number: DieRoll,
  isHeld: boolean,
  id: string,
}

type DiceState =  IndividualDiceState[]

type RollCount = {
  currentRoll: number
  rollCount: number
};



function App() {
  const [die, setDie] = useState<DiceState>(() => generateNewDice())
  const [rollHistory, setRollHistory] = useState<RollCount>({currentRoll: 0, rollCount: Number.POSITIVE_INFINITY})


  const [difficulty, setDifficulty] = useState<number>(45)
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      if(timer > 0 ){
        setTimer(prevTimer => prevTimer - 1)
        console.log("use effect")
      }

      if(gameOver){
        setTimer(0)
      }

      if(timer === 0){
        clearTimeout(timerId)
      }
    }, 1000)
    return () => clearTimeout(timerId)
  }, [timer])


  const gameWon = die.length > 0 && die.every(die => die.isHeld) && die.every(_die => _die.number === die[0].number)
  const gameLost = timer === 0


  const gameOver = gameWon || gameLost

  function startTimer(){
    setTimer(difficulty)
  }

  /**
   * @abstract will change the state of die state, to the opposite of the specific dices prior isHeld boolean
   * @param id the id created by nanoid
   */
  const holdDice = (id: string) => {
    // need to start time if not already started
    if(!rollHistory.currentRoll && !timer) startTimer()
    setDie(prevDie => {
      return prevDie.map(die => {
        return die.id === id? {...die, isHeld:!die.isHeld} : die;
      })
    })
  }

  /**
   * @abstract creates a new set of dice when there is a new game
   * @returns the new dice set of type
   **/
  function generateNewDice(): DiceState {
      const newDie = Array(10).fill(0).map(() => { return { isHeld: false, number: getRandomRoll(), id: nanoid()} satisfies IndividualDiceState }) as DiceState;
      return newDie
  }

  /**
   * @abstract handles the change in difficulty when the game isn't being played
   * @param difficulty the amount of seconds the game should last
   */
  function handleDifficulty(difficulty: number){
    setDifficulty(difficulty)
  }

  /**
   * @abstract rolls the dice. If a new game, substantiates 10 new die to play with
   * @returns void
   */
  const rollDice = () => {
    // need to start timer if not started already
    
    if(rollHistory.currentRoll === 0 && !timer) startTimer()  // start timer if not already started 


    if(!gameOver) {
      setRollHistory(prevRollHistory => ({...prevRollHistory, rollCount: prevRollHistory.rollCount + 1} satisfies RollCount )    )
      
      setDie(prevDie => {
        return prevDie.map((_die) => {
          return {
            ..._die,
            number: _die.isHeld ? _die.number : getRandomRoll(),
          } as IndividualDiceState
        })
      })
    } else {
      // inform user of or defeat
      console.log("Game Over! You rolled a total of ", rollHistory.rollCount, " times and got ", rollHistory.currentRoll, " correct.")
      
      setTimer(difficulty)
      setRollHistory(prevRollHistory => {
        if(prevRollHistory.currentRoll < prevRollHistory.rollCount ){
          return {...prevRollHistory, currentRoll: prevRollHistory.rollCount } satisfies RollCount
        } 
        return {...prevRollHistory, currentRoll: 0 }
      })
      setDie(generateNewDice())
    }
    
  }

  const displayDice = die.map((_die) => (
      <Dice key={_die.id} isHeld={_die.isHeld} onClick={() => holdDice(_die.id)}>
      {_die.number}
    </Dice>
  ))
  return (
    <main >
      <Difficulty gameOver={gameOver} handleDifficulty={handleDifficulty} difficulty={difficulty} />
      <Info timeRemaining={timer} currentRoll={rollHistory.currentRoll} />
      <section className='grid grid-cols-5'>
        {die ? displayDice : null}
        <Button className='px-8 justify-self-center col-span-full text-white rounded-sm mt-6 bg-indigo-700'  onClick={rollDice} >Roll</Button>
      </section>
    </main>
  )
}

export default App
