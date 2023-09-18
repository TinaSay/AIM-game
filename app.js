const startBtn = document.querySelector('.start')
const screens = document.querySelectorAll('.screen')
const timeBtns = document.querySelectorAll('.time-btn')
const timerEl = document.getElementById('time')
const board = document.querySelector('.board')
let score = 0;

const reset = () => {
    screens.forEach(screen => {
        screen.classList.remove('up')
    })
}

startBtn.addEventListener('click', e => {
    e.preventDefault()
    screens[0].classList.add('up')
})

let time = 0

const finishGame = () => {
    board.innerHTML = `<h1>Счет: ${score}</h1>`
    timerEl.parentNode.remove()

}

const setTime = () => {
    let currentTime;
    time--
    if (time < 10) {
        currentTime = `0${time}`
    } else {
        currentTime = time;
    }
    if (time < 0) {
        finishGame()
    } else {
        timerEl.innerText = `00:${currentTime}`
    }

}

const getRandomNumber = ((min, max) => {
    return Math.round(Math.random() * (max - min) + min)
})

const createRandomCircle = () => {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${getRandomNumber(0, height - size)}px`
    circle.style.left = `${getRandomNumber(0, width - size)}px`
    board.append(circle)
}

const startGame = () => {

    setInterval(() => {
        setTime()

    }, 1000)
    createRandomCircle()

    board.addEventListener('click', (e) => {
        if (e.target.classList.contains('circle')) {
            score++
            e.target.remove()
            createRandomCircle()
        }
    })
}

timeBtns.forEach(timeBtn => {
    timeBtn.addEventListener('click', () => {
        time = parseInt(timeBtn.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame();
    })

})

reset()
