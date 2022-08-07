import {addDoc, collection, doc, Firestore, getDocs, query, setDoc, where} from "firebase/firestore";
import {classData} from "../data/classData";

export async function getPlayers(db: Firestore) {
    const players = collection(db, 'players');
    const playersSnapshot = await getDocs(players);
    const playersList = playersSnapshot.docs.map(doc => doc.data());
    return playersList;
}

export async function getSignups(db: Firestore) {
    const signups = collection(db, 'signups');
    const signupsSnapshot = await getDocs(signups);
    const signupsList = signupsSnapshot.docs.map(doc => doc.data());
    return signupsList;
}

export const getClassData = (spec: character_class) => {
    // @ts-ignore
    return classData[spec] || null
}

export enum character_class{
    Berserker,
    Paladin,
    Gunlancer,
    Destroyer,
    Striker,
    Wardancer,
    Scrapper,
    Soulfist,
    Glaivier,
    Gunslinger,
    Artillerist,
    Deadeye,
    Sharpshooter,
    Bard,
    Sorceress,
    Arcanist,
    Shadowhunter,
    Deathblade,
}

export interface character{
    name: string,
    class: character_class,
    ilvl: number
}

export interface player{
    name: string,
    characters: Array<character>
}

export enum raids{
    Argos_p3,
    Valtan_nm,
    Valtan_hm,
    Valtan_inferno,
    Vykas_nm,
    Vykas_hm
}

export interface group{
    p1: {
        1: character,
        2: character,
        3: character,
        4: character,
    },
    p2: {
        1: character,
        2: character,
        3: character,
        4: character,
    }
}

export interface signups{
    date: string,
    raid: raids,
    characters: Array<character>,
    groups: Array<group>
}

export async function addPlayer(db: Firestore, player: player){
    const q = query(collection(db, "players"), where("name", "==", player.name))
    const querySnapshot = await getDocs(q)
    let result = null
    querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
        // console.log(doc.id, " => ", doc.data());
        result = doc.id
    })

    if (result !== null){
        alert("A player with this name already exists!")
        return
    }

    try {
        const docRef = await addDoc(collection(db, "players"), player);
        // localStorage.setItem('playerId', JSON.stringify(docRef.id))
        alert("Player added successfully")
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// export async function addPlayer(db: Firestore, player: player){
//     try {
//         const playersRef = collection(db, "players");
//         const docRef = await setDoc(doc(playersRef, player.name), player);
//         // localStorage.setItem('playerId', JSON.stringify(docRef.id))
//         console.log("Document written");
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// }