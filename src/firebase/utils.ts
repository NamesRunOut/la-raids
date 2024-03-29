import {addDoc, collection, Firestore, getDocs, serverTimestamp} from "firebase/firestore";
import {classData} from "../data/classData";

export async function getPlayers(db: Firestore) {
    const players = collection(db, 'players');
    const playersSnapshot = await getDocs(players);
    const playersList = playersSnapshot.docs.map(doc => doc.data());
    // console.log(playersList)
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

export enum character_class {
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
    Machinist,
    Bard,
    Sorceress,
    Arcanist,
    Summoner,
    Shadowhunter,
    Deathblade,
    Reaper,
    Artist
}

export interface character {
    name: string,
    class: character_class,
    ilvl: number
}

export interface player {
    name: string,
    characters: Array<character>
}

export enum raids {
    Argos_p3,
    Valtan_nm,
    Valtan_hm,
    Valtan_inferno,
    Vykas_nm,
    Vykas_hm
}

export interface group {
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

export interface signups {
    date: string,
    raid: raids,
    characters: Array<character>,
    groups: Array<group>
}

export const addLog = async (db: Firestore, log: any) => {
    try {
        const docRef = await addDoc(collection(db, "logs"), {...log, timestamp: serverTimestamp()});
    } catch (e) {
        console.error("Error adding log: ", e);
    }
}

