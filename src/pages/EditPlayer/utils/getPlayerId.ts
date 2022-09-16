import {collection, Firestore, getDocs, query, where} from "firebase/firestore";

const getPlayerId = async (db: Firestore, playerName: string) => {
    const q = query(collection(db, "players"), where("name", "==", playerName))
    const querySnapshot = await getDocs(q)
    let result: [string, any]
    result = ["", {}]
    querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
        // console.log(doc.id, " => ", doc.data());
        result = [doc.id, doc.data()]
    })
    return result
}

export default getPlayerId