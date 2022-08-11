import { ChangeEvent } from "react";

const changeIlvl = (e: ChangeEvent<HTMLInputElement>, i: number, player: any, setPlayer: any) => {
    let tmp = player.characters
    let idx = tmp.findIndex((el: { id: number; }) => el.id === i)
    tmp[idx].ilvl = parseInt(e.target.value)
    setPlayer({...player, characters: [...tmp]})
}

export default changeIlvl