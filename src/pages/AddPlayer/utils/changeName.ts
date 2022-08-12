import {ChangeEvent} from "react";
import {playerI} from "../../../interfaces/playerI";

const changeName = (e: ChangeEvent<HTMLInputElement>, i: number, player: playerI, setPlayer: any) => {
    let tmp = player.characters
    let idx = tmp.findIndex((el) => el.id === i)
    tmp[idx].name = e.target.value
    setPlayer({...player, characters: [...tmp]})
}

export default changeName