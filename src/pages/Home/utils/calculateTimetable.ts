const arePlayersUnique = (group1: any, group2: any) => {
    for (let player1 of group1){
        for (let player2 of group2){
            if (player1.playerName === player2.playerName) return false
        }
    }
    return true
}

const calculateTimetable = (raid: any) => {
    let result: any = []

    if (raid.length < 1) return result

    let slot = [{
        name: raid[0][0],
        players: raid[0][1]
    }]

    for (let i=1;i<raid.length;i++){
        let name = raid[i][0]
        let players = raid[i][1]

        let allPlayersInSlot = []
        for (let group of slot){
            for (let player of group.players){
                allPlayersInSlot.push(player)
            }
        }

        if (arePlayersUnique(allPlayersInSlot, players)){
            slot.push({name: name, players: players})
        } else {
            result.push(slot)
            slot = [{name: name, players: players}]
        }
    }

    if (slot.length > 0) result.push(slot)

    return result
}

export default calculateTimetable