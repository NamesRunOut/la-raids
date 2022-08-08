import {doc, Firestore, getDoc} from "firebase/firestore";

export const getRaid = async (db: Firestore, raid: string) => {
    const raidRef = doc(db, "raids", raid);
    const docSnap = await getDoc(raidRef)

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        console.log("No such raid!", raid)
        return {comment: ""}
    }
}

export const compareGroupName = (a: any, b: any) => {
    let n1 = parseInt(a[0].slice(5))
    let n2 = parseInt(b[0].slice(5))
    console.log(n1, n2, n1<n2)
    if (n1 < n2)
        return -1
    if (n1 > n2)
        return 1
    return 0
}