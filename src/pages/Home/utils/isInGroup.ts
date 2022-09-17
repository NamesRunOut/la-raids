import isHighlighted from "./isHighlighted";

const isInGroup = (highlightedPlayer: string, group: Array<any>) => {
    for (let player of group){
        if (isHighlighted(highlightedPlayer, player.playerName)){
            return true
        }
    }
    return false
}

export default isInGroup