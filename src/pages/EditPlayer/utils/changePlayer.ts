const changePlayer = (e: any, player: any, allPlayers: any, setPlayer: any) => {
    let tmp = player
    let idx = allPlayers.findIndex((p: any) => p.name === e.target.value)
    if (idx !== -1) {
        tmp = allPlayers[idx]
        setPlayer({...tmp, origName: allPlayers[idx].name})
    }
}

export default changePlayer