import { removeState } from "../js/lib"

// This test click on rendom blocks.
global.t1 = function Test1() {
    removeState()
    var clickedBlocks = []
    var x = 0, y = 0, diamondCount = 0;

    while (diamondCount < 8) {
        x = Math.round(Math.random() * 7)
        y = Math.round(Math.random() * 7)
        if (!clickedBlocks.includes(`${x}-${y}`)) {
            diamondCount = doClick(x, y).isDiamond ? diamondCount + 1 : diamondCount
            clickedBlocks.push(`${x}-${y}`)
        }
    }
    document.querySelector(".test-messages").innerHTML = `Test Score: ${64 - clickedBlocks.length}`
}

// This test click on rendom block if that is blank then click on highlighted block otherwise click on rendom block.
global.t2 = function Test2() {
    removeState()
    var clickedBlocks = []
    var x = 0, y = 0, recommendedBlock = [], diamondCount = 0;
    var doClickRes = null;

    while (diamondCount < 8) {
        if (recommendedBlock.length) {
            x = recommendedBlock[0]
            y = recommendedBlock[1]
        } else {
            x = Math.round(Math.random() * 7)
            y = Math.round(Math.random() * 7)
        }

        if (!clickedBlocks.includes(`${x}-${y}`)) {
            doClickRes = doClick(x, y);
            diamondCount = doClickRes.isDiamond ? diamondCount + 1 : diamondCount;
            recommendedBlock = doClickRes.nearestDiamondCoordinate;
            clickedBlocks.push(`${x}-${y}`)
        }
    }
    document.querySelector(".test-messages").innerHTML = `Test Score: ${64 - clickedBlocks.length}`
}

// click on provided coordinate block.
function doClick(x, y) {
    var obj = {
        isDiamond: false,
        nearestDiamondCoordinate: []
    }
    var element = document.querySelector(`div[data-index="${x}-${y}"]`);
    element.click();
    obj.isDiamond = element.className.includes("diamond");

    element = document.querySelector(".highlight")
    obj.nearestDiamondCoordinate = element ? element.getAttribute("data-index").split("-") : []

    return obj
}

// enable hot module
if (module && module.hot) {
    module.hot.accept();
}