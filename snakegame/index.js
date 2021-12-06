const grid = document.getElementById("grid")
const start = document.getElementById("start")
const scoreBoard = document.getElementById("score")
let squares = []
let score = 0
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let intervalTime = 1000
let timer
let appleIndex = 0

start.addEventListener("click", () => {
    clearInterval(timer)
    squares[currentSnake[0]].classList.remove("snakehead")
    score = 0
    scoreBoard.textContent = score
    timer = setInterval(move, intervalTime);
    currentSnake.forEach(index => squares[index].classList.remove("snake"))
    currentSnake = [2,1,0]
    currentSnake.forEach(index => squares[index].classList.add("snake"))
    squares[appleIndex].classList.remove("apple")
    squares[currentSnake[0]].classList.add("snakehead")

    generateApple()
})

function generateSquares() {
    for (let i = 0; i < width*width; i++) {
        const square = document.createElement("div")
        square.classList.add("square")
        grid.appendChild(square)
        squares.push(square)
    }
    squares[currentSnake[0]].classList.add("snakehead")

}

generateSquares()
currentSnake.forEach(index => squares[index].classList.add("snake"))

function move() {
    const tail = currentSnake.pop()
    squares[tail].classList.remove("snake")

    if (
        (currentSnake[0] - width < 0 && direction === -width) || // up
        (currentSnake[0] + width >= width*width && direction === width) || // down
        (currentSnake[0] % width === 0 && direction === -1) || // left
        (currentSnake[0] % width === 9 && direction === 1) || // right
        (squares[currentSnake[0] + direction].classList.contains("snake"))
    ) return clearInterval(timer)

    currentSnake.unshift(currentSnake[0] + direction)
    squares[currentSnake[0]].classList.add("snake")
    currentSnake.forEach(index => squares[index].classList.remove("snakehead"))
    squares[currentSnake[0]].classList.add("snakehead")
    
    if (squares[currentSnake[0]].classList.contains("apple")) {
        squares[appleIndex].classList.remove("apple")
        squares[tail].classList.add("snake")
        currentSnake.push(tail)
        clearInterval(timer)
        intervalTime *= 0.9
        score++
        scoreBoard.textContent = score
        timer = setInterval(move, intervalTime)
        generateApple()
    }
}

function generateApple() {
    appleIndex = Math.floor(Math.random() * width*width)
    if (squares[appleIndex].classList.contains("snake")) {
        generateApple()
    } else {
        squares[appleIndex].classList.add("apple")
    }
}


addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            direction = -width
            break
        case "ArrowDown":
            direction = width
            break
        case "ArrowLeft":
            direction = -1
            break
        case "ArrowRight":
            direction = 1
            break
    }
})