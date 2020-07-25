export function saveState(state){
    localStorage.setItem("state", JSON.stringify(state));
}

export function getState(){
    return JSON.parse(localStorage.getItem("state"))
}

export function removeState(){
    localStorage.removeItem("state")
}