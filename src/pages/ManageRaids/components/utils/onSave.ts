import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../../../firebase/init";
import {signedupgroupname} from "./consts";

const onSave = async (raid: string, rcomment: any, elements: { [s: string]: unknown; } | ArrayLike<unknown>, setNotification: (arg0: { color: string; message: string; }) => void) => {
    // TODO password protected?
    // auth?

    const raidRef = doc(db, "raids", raid)
    const docSnap = await getDoc(raidRef)

    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        let roster = {
            comment: rcomment
        }

        for (let [key, value] of Object.entries(elements)){
            if (key === signedupgroupname) continue
            // @ts-ignore
            roster[key] = value
        }

        await setDoc(doc(db, "raids", raid), {
            ...roster
        })
            .then(r => setNotification({color: "lightgreen", message: "Raid saved"}))
            .catch(err => {
                setNotification({color: "lightred", message: "Error saving raid"})
                console.log(err)
            })

    } else {
        console.log("No such raid!");
    }
}

export default onSave