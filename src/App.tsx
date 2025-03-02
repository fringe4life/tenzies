
import { useEffect, useState } from 'react'

import Dice from './components/Dice'
import Button from './components/Button'
import { getRandomRoll, type DieRoll } from './util'
import { nanoid } from 'nanoid'
import Difficulty from './components/Difficulty'
import Info from './components/Info'
import RollInfo from './components/RollInfo'
import clsx from 'clsx'

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
  const [timer, setTimer] = useState<number>(1)

  /**
   * @abstract tracks whether player has started
   */
  const [playingGame, setplayingGame] = useState<boolean>(false)

  /**
   * @abstract determines if all die are held and that the die are all the same number
   */
  const gameWon = die.length > 0 && die.every(die => die.isHeld) && die.every(_die => _die.number === die[0].number)
  /**
   * @abstract determines if player ran out of time
   */
  const gameLost = timer === 0 
  /**
   * @abstract determines if game is over
   */
  const gameOver = gameWon || gameLost;

  /**
   * @abstract this useEffect is used to interact with the setTimeout browser API
   * to safely interact with this non react API
   */
  useEffect(() => {
    const timerId = window.setTimeout(() => {
      if(!gameOver && playingGame){
        setTimer(prevTimer => prevTimer - 1)
      } else if(timer === 0 || gameOver){
        clearTimeout(timerId)
        console.log("cleanup from useEffect")
        cleanupGame()
      
      }
    }, 1000)
    return () => clearTimeout(timerId)
  }, [timer, gameOver, playingGame])


  
  /**
   * @abstract starts the timer when player starts
   * holding dice or rolling new dice
   */
  function startTimer(){
    setplayingGame(true)
    setTimer(difficulty)
  }

  /**
   * @abstract will change the state of die state, to the opposite of the specific dices prior isHeld boolean
   * @param id the id created by nanoid
   */
  const holdDice = (id: string) => {
    // need to start time if not already started
    if(!playingGame) startTimer()
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
    if(!playingGame) startTimer()


    if(!gameOver) {
      setRollHistory(prevRollHistory => ({...prevRollHistory, currentRoll: prevRollHistory.currentRoll + 1} satisfies RollCount )    )
      setDie(prevDie => {
        return prevDie.map((_die) => {
          return {
            ..._die,
            number: _die.isHeld ? _die.number : getRandomRoll(),
          } satisfies IndividualDiceState
        })
      })
    } else {
      setDie(generateNewDice())
    }
    
  }
  /**
   * @abstract the variable that is an array of Dice
   */
  const displayDice = die.map((_die) => (
      <Dice key={_die.id} isHeld={_die.isHeld} onClick={() => holdDice(_die.id)}>
      {_die.number}
    </Dice>
  ))

  /**
   * @abstract sets playingGame to false
   * and updates rollHistory
   */
  function cleanupGame(){
    if(gameWon && playingGame){
      setRollHistory(
							(prevRollHistory) =>
								({
									rollCount: Math.min(
										prevRollHistory.rollCount,
										rollHistory.currentRoll,
									),
                  currentRoll: 0
								}) satisfies RollCount,
						)
    } else if(gameLost && playingGame) {
      setRollHistory(prevRollHistory => ({
          ...prevRollHistory,
          currentRoll: 0
      }))
    }

    setplayingGame(false)
  }

  return (
    <main >
      <Difficulty gameOver={playingGame} handleDifficulty={handleDifficulty} difficulty={difficulty} />
      <Info >
        <RollInfo>Current Roll: {rollHistory.currentRoll === Number.POSITIVE_INFINITY ? 0 : rollHistory.currentRoll}</RollInfo>
        <p aria-live="polite">{playingGame ? `Time Left: ${timer} seconds` : "Begin Game"}</p> 
      </Info>
      { gameOver && <RollInfo className={clsx({"text-center mb-4": true, "text-green-600":gameWon, "text-red-600": gameLost})}>{gameWon ? "Congratulations!" : "You ran out of time try again!"}</RollInfo>}
      {rollHistory.rollCount < Number.POSITIVE_INFINITY && <RollInfo className='text-center'>Best Roll: {rollHistory.rollCount}</RollInfo>}
      <section className='grid grid-cols-5 justify-items-center'>
        {die ? displayDice : null}
        <Button className='px-8 justify-self-center col-span-full text-white rounded-sm mt-6 bg-indigo-700'  onClick={rollDice} >{gameOver ? 'New Game' : "Roll"}</Button>
      </section>
    </main>
  )
}

export default App
