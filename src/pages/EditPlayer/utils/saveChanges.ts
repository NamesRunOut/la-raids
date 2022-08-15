import getPlayerId from "./getPlayerId";
import {db} from "../../../firebase/init";
import {addLog, player as playerI} from "../../../firebase/utils";
import {collection, doc, setDoc} from "firebase/firestore";

const saveChanges = (player: any, trackedPlayer: string, setNotification: any) => {
    getPlayerId(db, player.origName)
        .then(pid => {
            let tmp: playerI
            tmp = {
                name: player.name,
                characters: []
            }

            for (let i = 0; i < player.characters.length; i++) {
                tmp.characters.push({
                    class: player.characters[i].class,
                    ilvl: player.characters[i].ilvl,
                    name: player.characters[i].name
                })
            }

            const playersRef = collection(db, "players");
            setDoc(doc(playersRef, pid), tmp)
                .then(r => {
                    setNotification({color: "lightgreen", message: "Changes saved"})
                    let log = {
                        player: trackedPlayer === "" ? "unknown" : trackedPlayer,
                        text: "Edited a player: " + player.name
                    }
                    addLog(db, log)
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

export default saveChanges