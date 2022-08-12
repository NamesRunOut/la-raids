import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../../firebase/init";
import {signedupgroupname} from "./consts";
import {addLog} from "../../../firebase/utils";

const onSave = async (raid: string, rcomment: any, elements: { [s: string]: unknown; } | ArrayLike<unknown>, setNotification: any, trackedPlayer: string) => {
    // TODO password protected?
    // auth?

    const raidRef = doc(db, "raids", raid)
    const docSnap = await getDoc(raidRef)

    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        let roster = {
            comment: rcomment
        }

        for (let [key, value] of Object.entries(elements)) {
            if (key === signedupgroupname) continue
            // @ts-ignore
            roster[key] = value
        }

        await setDoc(doc(db, "raids", raid), {
            ...roster
        })
            .then(r => {
                setNotification({color: "lightgreen", message: "Raid saved"})

                let logText = `comment: ${rcomment}, `
                for (let [key, value] of Object.entries(elements)) {
                    if (key === "comment") continue
                    let tmp = `${key}: [`
                    // @ts-ignore
                    for (let g of value) {
                        tmp = tmp + `${g.name}, `
                    }
                    logText = logText + tmp + "], "
                }
                let log = {
                    player: trackedPlayer === "" ? "unknown" : trackedPlayer,
                    text: `Saved changes to a raid: ${raid}, new data: ${logText}`
                }
                addLog(db, log)
            })
            .catch(err => {
                setNotification({color: "lightcoral", message: "Error saving raid"})
                console.log(err)
            })

    } else {
        console.log("No such raid!");
    }
}

export default onSave