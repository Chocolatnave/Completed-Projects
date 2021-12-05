// Create variables for the game state
let player1Score = 50
let player2Score = 100
let player1Turn = true
let playerGold = 100
let playerTotalGold = 100
let playerSword = false
let playerArmor = false
let playerHP = false
let level = 0

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")
const players = document.getElementById("allPlayers")
const openShop = document.getElementById("shop")
const overlay = document.getElementById("overlay")
const store = document.getElementById("store")
const closeShop = document.getElementById("close-shop")
const sword = document.getElementById("sword")
const armor = document.getElementById("armor")
const hp = document.getElementById("hp")
const gold = document.getElementById("gold")
const start = document.getElementById("startBtn")
const selectLevel = document.getElementById("selectLevel")
const levels = document.getElementById("all-levels")
const level1 = document.getElementById("level1")
const level2 = document.getElementById("level2")
const level3 = document.getElementById("level3")


// vvv New Features vvv
openShop.addEventListener("click", function() {
    overlay.style.display = "block"
})

closeShop.addEventListener("click", function() {
    overlay.style.display = "none"
})

sword.addEventListener("click", function() {
    if (playerGold >= 100 && playerTotalGold >= 100) {
        playerSword = true
        sword.style.display = "none"
        playerGold -= 100
        getGold()
    }
})

armor.addEventListener("click", function() {
    if (playerGold >= 100 && playerTotalGold >= 100) {
        playerArmor = true
        armor.style.display = "none"
        playerGold -= 100
        getGold()
    }
})

hp.addEventListener("click", function() {
    if (playerGold >= 100 && playerTotalGold >= 100) {
        playerHP = true
        hp.style.display = "none"
        playerGold -= 100
        getGold()
    }  
})

function getGold() {
    gold.textContent = "You Currently Have " + playerGold + " Gold"
}

getGold()

function showResetButton() {
    rollBtn.style.display = "none"
    resetBtn.style.display = "initial"
}

function pSword() {
    if (playerSword) {
        randomNumber += 3
        console.log("sword")
    }
}


function pHP() {
    if (playerHP) {
        player1Score += 50
        player1Scoreboard.textContent = player1Score
    }
}


// function playerGear() {
//     pSword()
//     pHP()
//     pArmor()
// }

/* Hook up a click event listener to the Roll Dice Button. */


function hideLevels() {
    level1.style.display = "none"
    level2.style.display = "none"
    level3.style.display = "none"
}
selectLevel.addEventListener("click", function() {
    selectLevel.style.display = "none"
    message.textContent = "Select a difficulty"
    level1.style.display = "initial"
    level2.style.display = "initial"
    level3.style.display = "initial"
})

level1.addEventListener("click", function () {
    player2Score = 50
    level = 1
    startBtn.style.display = "initial"
    hideLevels()
    message.textContent = "Level 1 selected"
})

level2.addEventListener("click", function () {
    player2Score = 150
    level = 2
    startBtn.style.display = "initial"
    hideLevels()
    message.textContent = "Level 2 selected" 
})

level3.addEventListener("click", function () {
    player2Score = 300
    level = 3
    startBtn.style.display = "initial"
    hideLevels()   
    message.textContent = "Level 3 selected"
})

startBtn.addEventListener("click", function() {
    pHP()
    rollBtn.style.display = "initial"
    players.style.display = "flex"
    startBtn.style.display = "none"
    message.textContent = "Your Turn"
    shop.style.display = "none"
    player2Scoreboard.textContent = player2Score
})

rollBtn.addEventListener("click", function() {   
    
    let randomNumber = Math.floor(Math.random() * 10)
    // vvv Item modifiers vvv
    let player1Damage = randomNumber + 3
    let player2Damage = randomNumber - 3
        if (player2Damage <= 0) {
            player2Damage = 0
        }
    // vvv Checks for items vvv
    if (player1Turn) {
        if (playerSword) {
            player2Score -= player1Damage
            player1Dice.textContent = player1Damage
            message.textContent = "You hit the enemy dealing " + player1Damage + " damage!"
        } else {
            player2Score -= randomNumber
            player1Dice.textContent = randomNumber
            message.textContent = "You hit the enemy dealing " + randomNumber + " damage!"
        }
        player2Scoreboard.textContent = player2Score
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
    } else {
        if (playerArmor) {
            player1Score -= player2Damage
            player2Dice.textContent = player2Damage
            message.textContent = "The enemy hits you dealing " + player2Damage + " damage!"
        } else {
            player1Score -= randomNumber
            player2Dice.textContent = randomNumber
            message.textContent = "The enemy hits you dealing " + randomNumber + " damage!"
        }
        player1Scoreboard.textContent = player1Score
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        
    }
    
    if (player1Score <= 0) {
        showResetButton()
        if (level === 1) {
            message.textContent = "You have been Defeated... You earn 50 Gold for your efforts"
            playerGold += 50
            playerTotalGold += 50
        } else if (level === 2) {
            message.textContent = "You have been Defeated... You earn 50 Gold for your efforts"
            playerGold += 50
            playerTotalGold += 50
        } else {
            message.textContent = "You have been Defeated... You earn 50 Gold for your efforts"
            playerGold += 50
            playerTotalGold += 50
        }
        getGold()
        shop.style.display = "initial"
        
    }  else if (player2Score <= 0) {
        if (level === 1) {
            message.textContent = "You are Victorious! You earn 50 Gold for Winning!"
            playerGold += 50
            playerTotalGold += 50
        } else if (level === 2) {
            message.textContent = "You are Victorious! You earn 100 Gold for Winning!"
            playerGold += 100
            playerTotalGold += 100
        } else {
            message.textContent = "You are Victorious! You earn 200 Gold for Winning!"
            playerGold += 200
            playerTotalGold += 200
        }
        showResetButton()
        getGold()
        shop.style.display = "initial"
        
    }
    player1Turn = !player1Turn
})
 
resetBtn.addEventListener("click", function(){
    reset()
    players.style.display = "none"
    message.textContent = "Select a difficulty"
})

function reset() {
    player1Score = 50
    player2Score = 100
    pHP()
    player1Turn = true
    player1Scoreboard.textContent = player1Score
    player2Scoreboard.textContent = player2Score
    player1Dice.textContent = "-"
    player2Dice.textContent = "-"
    resetBtn.style.display = "none"
    selectLevel.style.display = "initial"
    player2Dice.classList.remove("active")
    player1Dice.classList.add("active")
}

