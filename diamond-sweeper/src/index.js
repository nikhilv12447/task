import { saveState, getState, removeState } from "./js/lib"
import "./scss/style.scss";

var state = {
    arr: [],
    diamondCoordinate: [],
    highlightCoordinate: [],
    score: 64,
    diamondFound: 0
}
var x = 0, y = 0;

var startApp = function (container) {
    if (getState()) {
        state = getState()
        resumeGame();
    } else {
        fillDiamondsAndPlayGame(container);
    }
}

function fillDiamondsAndPlayGame(container) {
    // create 8 X 8 array
    for (let i = 0; i < 8; i++) {
        state.arr.push(new Array(8).fill(null))
    }
    // ************************

    // Place Random diamond in array
    for (let i = 0; i < 8; i++) {
        x = Math.round(Math.random() * 7)
        y = Math.round(Math.random() * 7)
        if (state.arr[x][y]) {
            i -= 1
        } else {
            state.arr[x][y] = true;
            state.diamondCoordinate.push([x, y])
        }
    }
    // **************************************
    container.addEventListener("click", game)
}

function resumeGame() {
    state.arr.forEach((_arr, x) => {
        _arr.forEach((value, y) => {
            if (value === "diamond") {
                document.querySelector(`div[data-index="${x}-${y}"]`).className = "cell diamond";
            }
            if (value === "open") {
                document.querySelector(`div[data-index="${x}-${y}"]`).className = "cell";
            }
        })
    })

    if (state.highlightCoordinate.length) {
        document.querySelector(`div[data-index="${state.highlightCoordinate[0]}-${state.highlightCoordinate[1]}"]`).style.backgroundColor = "#e0e0e0"
    }

    container.addEventListener("click", game)
}

function game(event) {
    var index = event.target.getAttribute("data-index")

    if (index) {
        // Coordinates of clicked box
        index = index.split("-")
        x = parseInt(index[0]);
        y = parseInt(index[1]);
        // ****************************

        // Remove highlighted box
        if (state.highlightCoordinate.length) {
            document.querySelector(`div[data-index="${state.highlightCoordinate[0]}-${state.highlightCoordinate[1]}"]`).style.backgroundColor = "";
            state.highlightCoordinate = []
        }
        // ***************************

        // Game logic
        if (state.arr[x][y] === true) {
            removeDiamondCoordinate(x, y);
            event.target.className = "cell diamond";
            state.diamondFound++;
            state.arr[x][y] = "diamond"
            state.score -= 1;
            saveState(state)
        } else if(state.arr[x][y] === null){
            state.highlightCoordinate = findNearestDiamondCoordinate(x, y);
            document.querySelector(`div[data-index="${state.highlightCoordinate[0]}-${state.highlightCoordinate[1]}"]`).className = "cell unknown highlight"
            event.target.className = "cell";
            state.arr[x][y] = "open"
            state.score -= 1;
            saveState(state)
        }
        // *********************************************
        // Game End
        if (state.diamondFound === 8) {
            document.getElementsByClassName("messages")[0].innerHTML = `Score: ${state.score}`
            container.removeEventListener("click", game)
            removeState();
        }
    }
}

// params: y Coordinate, y Coordinate
// return: shortestCoordinate
export function findNearestDiamondCoordinate(x, y) {
    var shortestCoordinate = [], shortestDistance = null, temp = null;

    state.diamondCoordinate.forEach(coordinate => {
        temp = Math.sqrt(Math.pow(x - coordinate[0], 2) + Math.pow(y - coordinate[1], 2))
        if (shortestDistance === null || shortestDistance > temp) {
            shortestDistance = temp;
            shortestCoordinate = coordinate;
        }
    })

    return shortestCoordinate;
}

// remove x,y Coordinate from an array
function removeDiamondCoordinate(x, y) {
    for (var i = 0; i < state.diamondCoordinate.length; i++) {
        if (state.diamondCoordinate[i][0] === x && state.diamondCoordinate[i][1] === y) {
            state.diamondCoordinate.splice(i, 1)
            break;
        }
    }
}

startApp(document.getElementById("container"));

// hot module reloading
if (module && module.hot) {
    module.hot.accept();
}