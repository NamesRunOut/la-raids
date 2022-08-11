import {db} from "../../../firebase/init";
import { addPlayer } from "./addPlayer";

const saveChanges = (player: any, setPlayer: any, setNotification: any) => {
    let tmp = player
    for (let i=0;i<tmp.characters.length;i++){
        tmp.characters[i] = {
            name: tmp.characters[i].name,
            class: tmp.characters[i].class,
            ilvl: tmp.characters[i].ilvl
        }
    }

    addPlayer(db, tmp, setNotification)
}

export default saveChanges