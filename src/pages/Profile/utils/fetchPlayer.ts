import {doc, getDoc} from "firebase/firestore";
import {db} from "../../../firebase/init";

export const fetchPlayer = async (id: string, setPlayer: any, setNotification: any) => {
    const docRef = doc(db, "players", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        setPlayer(docSnap.data())
        return docSnap.data()
    } else {
        setNotification({color: "lightcoral", message: "Error fetching player"})
    }

    return null
}