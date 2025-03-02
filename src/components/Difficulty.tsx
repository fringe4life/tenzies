import Button from "./Button";
import clsx from "clsx";
interface DifficultyProps  {
    gameOver: boolean
    handleDifficulty: (newDifficult: number) => void
    difficulty: number  // in seconds, should be passed down from App.tsx or somewhere else where the difficulty is stored.
}


export default function Difficulty({gameOver, handleDifficulty, difficulty}:DifficultyProps){
    return (
        <section className="mt-4">
            <h2 className="text-center">Difficulty</h2>
            <div className=" flex flex-wrap flex-col items-center xs:flex-row">
                <Button disabled={gameOver} onClick={() => handleDifficulty(60)} className={clsx({"bg-green-200  xs:flex-2 text-center disabled:bg-gray-300 disabled:cursor-not-allowed text-sm":true, "text-white border disabled:bg-green-300 bg-green-600 font-semibold":difficulty === 60})}>Easy: 60s</Button>
                <Button disabled={gameOver} onClick={() => handleDifficulty(45)} className={clsx({"bg-orange-200 xs:flex-3 text-center disabled:bg-gray-300 disabled:cursor-not-allowed text-sm":true, "text-white border disabled:bg-orange-300 bg-orange-600 font-semibold":difficulty === 45})}>Medium: 45s</Button>
                <Button disabled={gameOver} onClick={() => handleDifficulty(30)} className={clsx({"bg-red-200 xs:flex-2 text-center disabled:bg-gray-300 disabled:cursor-not-allowed text-sm":true, "text-white border disabled:bg-red-300 bg-red-600 font-semibold":difficulty === 30})}>Hard: 30s</Button>
            </div>
        </section>
    )
}