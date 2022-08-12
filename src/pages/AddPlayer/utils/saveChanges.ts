import {db} from "../../../firebase/init";
import { addPlayer } from "./addPlayer";
import {addLog} from "../../../firebase/utils";

const saveChanges = (player: any, setPlayer: any, setNotification: any, trackedPlayer: string) => {
    let tmp = player
    for (let i=0;i<tmp.characters.length;i++){
        tmp.characters[i] = {
            name: tmp.characters[i].name,
            class: tmp.characters[i].class,
            ilvl: tmp.characters[i].ilvl
        }
    }

    addPlayer(db, tmp, setNotification)
        .then(r => {
            let log = {
                player: trackedPlayer === "" ? "unknown" : trackedPlayer,
                text: "Added a new player: "+player.name
            }
            addLog(db, log)
        })
}

export default saveChanges