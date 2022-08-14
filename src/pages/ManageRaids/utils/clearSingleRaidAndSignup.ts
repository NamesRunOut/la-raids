import {raidData} from "../../../data/raidData";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../../firebase/init";
import {addLog} from "../../../firebase/utils";

const clearSingleRaidAndSignup = async (trackedPlayer: string, raid: string, setNotification: any) => {
    //@ts-ignore
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to clear raid and signup data for ${raidData[raid]?.name}?`)) {
        await setDoc(doc(db, "signups", raid), {
            comment: "",
            players: [],
        })

        await setDoc(doc(db, "raids", raid), {
            comment: "",
        })

        let log = {
            player: trackedPlayer === "" ? "unknown" : trackedPlayer,
            // @ts-ignore
            text: `Cleared signups and raid data for ${raidData[raid]?.name}`
        }
        addLog(db, log)

        // window.location.reload()

        // @ts-ignore
        setNotification({color: "lightgreen", message: `Data cleared for ${raidData[raid]?.name}, refresh the page to see the changes`})
    }
}

export default clearSingleRaidAndSignup