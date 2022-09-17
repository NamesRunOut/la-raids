import getPlayerId from "./getPlayerId";
import {addLog, player as playerI} from "../../../firebase/utils";
import {collection, doc, setDoc} from "firebase/firestore";
import getWeekNumber from "../../../utils/getWeekNumber";
import {db} from "../../../firebase/init";

const saveChanges = (player: any, trackedPlayer: string, setNotification: any) => {
    // TODO alter getPlayerId after data migration, just need the data
    // TODO doesnt register first change when changing something twice, change->save->change->save
    getPlayerId(db, player.origName)
        .then(([pid, data]) => {
            let tmp: any
            tmp = {
                name: player.name,
                characters: [],
                ilvlHistory: []
            }

            let ilvlChanges: any
                ilvlChanges = []

            for (let i = 0; i < player.characters.length; i++) {
                let oldCharData = data.characters.find((char: any) => char.name === player.characters[i].name)
                let newCharData = player.characters[i]

                if (oldCharData !== undefined && oldCharData.ilvl !== newCharData.ilvl){
                    let date = getWeekNumber(new Date())
                    let year = date[0]
                    let weekNo = date[1]

                    ilvlChanges.push({
                        charName: newCharData.name,
                        ilvl: newCharData.ilvl,
                        year: year,
                        week: weekNo
                    })
                }

                tmp.characters.push({
                    class: newCharData.class,
                    ilvl: newCharData.ilvl,
                    name: newCharData.name
                })
            }

            if (player.ilvlHistory === undefined){
                tmp.ilvlHistory = [...ilvlChanges]
            } else {
                tmp.ilvlHistory = [...player.ilvlHistory, ...ilvlChanges]
            }

            const playersRef = collection(db, "players");
            // @ts-ignore
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