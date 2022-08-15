const changeName = (e: any, i: number, player: any, setPlayer: any) => {
    let tmp = player.characters
    let idx = tmp.findIndex((el: { id: number; }) => el.id === i)
    tmp[idx].name = e.target.value
    setPlayer({...player, characters: [...tmp]})
}

export default changeName