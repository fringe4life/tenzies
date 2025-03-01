
type InfoProps = {
    currentRoll: number;
    timeRemaining: number;
}

export default function Info({currentRoll, timeRemaining}: InfoProps){
    return (
        <aside>
            <p aria-live="off">Current Roll: {currentRoll === Number.POSITIVE_INFINITY ? 0 : currentRoll}</p>
            <p aria-live="polite">Time Left: {timeRemaining} seconds</p>
        </aside>
    )

}