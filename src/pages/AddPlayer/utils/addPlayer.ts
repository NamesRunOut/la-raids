import {doc, Firestore, getDoc, setDoc} from "firebase/firestore";
import {playerI} from "../../../interfaces/playerI";

export async function addPlayer(db: Firestore, player: playerI, setNotification: any) {
    const docRef = doc(db, "players", player.name)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        setNotification({color: "lightcoral", message: "A player with this name already exists!"})
        return
    } else {
        try {
            await setDoc(doc(db, "players", player.name), player)
            setNotification({color: "lightgreen", message: "Player added successfully"})
        } catch (e) {
            console.error("Error adding document: ", e)
        }
    }
}