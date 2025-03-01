import clsx from "clsx"
import dice1 from '../assets/dice-1.png'
import dice2 from '../assets/dice-2.png'
import dice3 from '../assets/dice-3.png'
import dice4 from '../assets/dice-4.png'
import dice5 from '../assets/dice-5.png'
import dice6 from '../assets/dice-6.png'
interface DiceProps extends React.ComponentPropsWithoutRef<"button"> {
    isHeld?: boolean
}

export default function Dice({isHeld, onClick, children}: DiceProps){
    let imgSrc = dice1
    switch(children as number){
        case 2:
            imgSrc = dice2
            break;
        case 3:
            imgSrc = dice3
            break;
        case 4:
            imgSrc = dice4
            break;
        case 5:
            imgSrc = dice5
            break;
        case 6:
            imgSrc = dice6
            break;
        default:
            imgSrc = dice1
    }
    return <button aria-pressed={isHeld} className={clsx({"text-center border m-2.5 rounded-sm font-bold w-10 h-10": true, "bg-green-500": isHeld})} aria-label={`Clicking this button will hold the ${children} dice number`} onClick={onClick} type="button">
            <div className="relative"><img className={clsx({"mix-blend-multiply after:w-full after:h-full after:absolute after:bg-green-500": isHeld})}src={imgSrc} alt={`dice number: ${children as string}`} /></div>
        </button>
}