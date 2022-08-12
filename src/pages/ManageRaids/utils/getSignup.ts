import {doc, Firestore, getDoc} from "firebase/firestore";

export const getSignup = async (db: Firestore, raid: string) => {
    let result: any = {
        comment: "",
        players: []
    }
    const signupRef = doc(db, "signups", raid)
    const sSnap = await getDoc(signupRef)

    const raidRef = doc(db, "raids", raid);
    const rSnap = await getDoc(raidRef);

    if (sSnap.exists()) {
        if (rSnap.exists()) {
            result.comment = rSnap.data().comment
            let signups = sSnap.data().players
            for (let [key, value] of Object.entries(rSnap.data())) {
                key = key.toLowerCase()
                if (key === "comment") continue
                let tmp = []
                // if players canceled signup, remove from group
                // get fresh data from signups, replace
                for (let player of value) {
                    let pIdx = signups.findIndex((el: any) => el.name === player.name && el.playerName === player.playerName)
                    if (pIdx !== -1) {
                        tmp.push(signups[pIdx])
                        signups.splice(pIdx, 1)
                    }
                }
                result[key] = [...tmp]
            }
            result.players = [...signups]
            return result
        }
        return sSnap.data()
    } else {
        console.log("No such raid!", raid)
        return {comment: "", players: []}
    }
}