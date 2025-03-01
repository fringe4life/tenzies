

type DieRoll = 1 | 2 | 3 | 4 | 5 | 6;


function getRandomRoll(): DieRoll{
    return (Math.floor(Math.random() * 6) + 1) as DieRoll;
}



export {
    getRandomRoll,
    type DieRoll
}