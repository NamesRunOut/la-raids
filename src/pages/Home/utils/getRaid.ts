import {doc, Firestore, getDoc} from "firebase/firestore";

const getRaid = async (db: Firestore, raid: string) => {
    const raidRef = doc(db, "raids", raid);
    const docSnap = await getDoc(raidRef)

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        console.log("No such raid!", raid)
        return {comment: ""}
    }
}

export default getRaid