const removeCharacter = (char: any, player: any, setPlayer: any) => {
    let tmp = player.characters
    tmp.splice(tmp.findIndex((el: { id: number; }) => el.id === char.id), 1)
    // tmp.splice(player.characters.findIndex((el: any) => el.name == char.name && el.class == char.class && el.ilvl == char.ilvl), 1)
    setPlayer({
        ...player,
        characters: [...tmp]
    })
}

export default removeCharacter