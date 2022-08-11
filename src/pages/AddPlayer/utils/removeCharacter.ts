const removeCharacter = (char: any, player: any, setPlayer: any) => {
    let tmp = player.characters
    tmp.splice(tmp.findIndex((el: { id: number; }) => el.id === char.id), 1)
    setPlayer({
        ...player,
        characters: [...tmp]
    })
}

export default removeCharacter