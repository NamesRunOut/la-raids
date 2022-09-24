import {collection, Firestore, getDocs, query} from "firebase/firestore";

const getAllRaidSignupData = async (db: Firestore) => {
    const q = query(collection(db, "signups"))
    const querySnapshot = await getDocs(q)
    let result = new Map()
    querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
        // console.log(doc.id, " => ", doc.data());
        result.set(doc.id, doc.data())
    })
    return result
}

export default getAllRaidSignupData