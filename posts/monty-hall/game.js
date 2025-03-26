
function emptyWins() {
    return {
        kept_won: 0,
        kept_total: 0,
        switched_won: 0,
        switched_total: 0
    };
}

function displayWinRate(gameDiv) {
    wins = gameDiv.gameInfo.wins;
    let wins_kept_rate =
        wins.kept_total === 0 ? 0 : wins.kept_won / wins.kept_total;
    let wins_switched_rate =
        wins.switched_total === 0 ? 0 : wins.switched_won / wins.switched_total;
    
    gameDiv.getElementsByClassName("wins-kept")[0].innerText =
        `${Math.floor(wins_kept_rate * 100)}% (${wins.kept_won}/${wins.kept_total})`;
    gameDiv.getElementsByClassName("wins-switched")[0].innerText =
        `${Math.floor(wins_switched_rate * 100)}% (${wins.switched_won}/${wins.switched_total})`;
}

function createGame(gameDiv, wins, evil) {
    gameDiv.innerHTML = `
        <p class="status">Choose a door!</p>
        <div class="doors">
            <div class="door door1">
                <img src="door.png">
                <br>
                <button onclick="chooseDoor(this, 1)">Choose Door 1</button>
            </div>
            <div class="door door2">
                <img src="door.png">
                <br>
                <button onclick="chooseDoor(this, 2)">Choose Door 2</button>
            </div>
            <div class="door door3">
                <img src="door.png">
                <br>
                <button onclick="chooseDoor(this, 3)">Choose Door 3</button>
            </div>
        </div>
        <br>
        <div>Win rate when first choice kept: <span class="wins-kept"></span></div>
        <div>Win rate when switched: <span class="wins-switched"></span></div>
        <button onclick="resetWinRates(this)">Reset Wins</button>
    `;

    let carDoor = Math.ceil(Math.random() * 3);
    console.log("car door: " + carDoor)

    gameDiv.gameInfo = {
        wins: wins,
        carDoor: carDoor,
        evil: evil
    };
    displayWinRate(gameDiv);
}

function setDoorHTML(gameDiv, num, html) {
    gameDiv.getElementsByClassName("door" + num)[0].innerHTML = html;
}

function showAllDoors(gameDiv) {
    let carDoor = gameDiv.gameInfo.carDoor;
    let carHTML = `<img src="car.png">`;
    let goatHTML = `<img src="goat.jpg">`;
    let playAgainButton = `<br><button onclick="newGame(this)">Play Again</button>`
    setDoorHTML(gameDiv, 1, carDoor === 1 ? carHTML : goatHTML);
    setDoorHTML(gameDiv, 2, (carDoor === 2 ? carHTML : goatHTML) + playAgainButton);
    setDoorHTML(gameDiv, 3, carDoor === 3 ? carHTML : goatHTML);
}

function chooseDoor(element, playerChoice) {
    let gameDiv = element.parentElement.parentElement.parentElement;
    console.log("choose door " + playerChoice);

    if (gameDiv.gameInfo.evil && playerChoice !== gameDiv.gameInfo.carDoor) {
        gameDiv.getElementsByClassName("status")[0].innerText =
            `The host opens door No. ${gameDiv.gameInfo.carDoor} and reveals a car! You lose!`
        showAllDoors(gameDiv);
        return;
    }

    let revealedDoor = gameDiv.gameInfo.carDoor;
    while (revealedDoor === gameDiv.gameInfo.carDoor || revealedDoor === playerChoice) {
        revealedDoor = Math.ceil(Math.random() * 3);
    }

    let unknownDoor = 6 - playerChoice - revealedDoor; // the door to switch to

    let itemText = revealedDoor === gameDiv.gameInfo.carDoor ? "car" : "goat";
    let itemSrc = revealedDoor === gameDiv.gameInfo.carDoor ? "car.png" : "goat.jpg";
    gameDiv.getElementsByClassName("status")[0].innerText =
        `The host opens door No. ${revealedDoor} and reveals a ${itemText}! Do you want to switch?`;
    
    setDoorHTML(gameDiv, revealedDoor, `<img src="${itemSrc}">`);
    setDoorHTML(gameDiv, playerChoice, 
        `<img src="door.png"><br><button onclick="openDoor(this, ${playerChoice}, false)">Keep Door ${playerChoice}</button>`
    );
    setDoorHTML(gameDiv, unknownDoor,
        `<img src="door.png"><br><button onclick="openDoor(this, ${unknownDoor}, true)">Switch to Door ${unknownDoor}</button>`
    );
}


function openDoor(element, playerChoice, isSwitch) {
    let gameDiv = element.parentElement.parentElement.parentElement;
    console.log("open door " + playerChoice);

    let isWin = playerChoice ===  gameDiv.gameInfo.carDoor;
    gameDiv.getElementsByClassName("status")[0].innerText =
        `You ${isWin? "win" : "lose"}!`
    
    showAllDoors(gameDiv);

    if (isSwitch) {
        gameDiv.gameInfo.wins.switched_won += (isWin ? 1 : 0);
        gameDiv.gameInfo.wins.switched_total += 1;
    } else {
        gameDiv.gameInfo.wins.kept_won += (isWin ? 1 : 0);
        gameDiv.gameInfo.wins.kept_total += 1;
    }
    displayWinRate(gameDiv);
}


function newGame(element) {
    let gameDiv = element.parentElement.parentElement.parentElement;
    console.log("new game");
    createGame(gameDiv, gameDiv.gameInfo.wins, gameDiv.gameInfo.evil);
}

function resetWinRates(element) {
    let gameDiv = element.parentElement;
    console.log("reset win rates");
    gameDiv.gameInfo.wins = emptyWins();
    displayWinRate(gameDiv);
}



for (const g of document.getElementsByClassName("normal-game")) {
    createGame(g, emptyWins(), false);
}

for (const g of document.getElementsByClassName("evil-game")) {
    createGame(g, emptyWins(), true);
}



