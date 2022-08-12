import {addDoc, collection, Firestore, getDocs, query, where} from "firebase/firestore";
import {playerI} from "../../../interfaces/playerI";

export async function addPlayer(db: Firestore, player: playerI, setNotification: any) {
    const q = query(collection(db, "players"), where("name", "==", player.name))
    const querySnapshot = await getDocs(q)
    let result = null
    querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
        // console.log(doc.id, " => ", doc.data());
        result = doc.id
    })

    if (result !== null) {
        setNotification({color: "lightcoral", message: "A player with this name already exists!"})
        return
    }

    try {
        const docRef = await addDoc(collection(db, "players"), player);
        // localStorage.setItem('playerId', JSON.stringify(docRef.id))
        setNotification({color: "lightgreen", message: "Player added successfully"})
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}