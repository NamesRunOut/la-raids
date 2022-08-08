import styled from "styled-components";
import React, {useContext, useEffect, useState} from "react";
import {Reorder, useMotionValue} from "framer-motion";
import {getPlayers, getSignups, player, raids, signups} from "../../firebase/utils";
import {db} from "../../firebase/init";
import { raidData } from "../../data/raidData";
import { Character, Characters, Navbar, Player, PName, RaidLink, RaidWrapper, SectionTitle, Signups, Title, Wrapper, Comment, Action } from "./styles";
import DragList, { signedupgroupname } from "./components/Raid/Raid";
import {doc, Firestore, getDoc, setDoc} from "firebase/firestore";
import {NotificationContext} from "../../contexts/NotificationContext";

export const getSignup = async (db: Firestore, raid: string) => {
    const raidRef = doc(db, "signups", raid);
    const docSnap = await getDoc(raidRef);

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        console.log("No such raid!", raid)
        return {comment: "", players: []}
    }
}

const ManageRaids = () => {
    const [signups, setSignups] = useState<any>({comment: "", players: []})//useState<Array<signups>>([])
    const [selected, setSelected] = useState(Object.keys(raidData)[0])
    const [setNotification] = useContext(NotificationContext)

    useEffect(() => {
        getSignup(db, selected)
            .then(r => setSignups(r))
            .catch(err => console.log(err))
    }, [selected])

    const clearRaidsAndSignups = async () => {
        for (let key of Object.keys(raidData)) {
            await setDoc(doc(db, "signups", key), {
                comment: "",
                players: []
            })

            await setDoc(doc(db, "raids", key), {
                comment: ""
            })
        }
        setSignups({comment: "", players: []})
        setNotification({color: "lightgreen", message: "Data cleared"})
    }

    return (<Wrapper>
        <SectionTitle>General settings</SectionTitle>
        <Action onClick={clearRaidsAndSignups}>Clear assignments and sign ups from all raids</Action>

        <hr />
        <SectionTitle>Individual raid settings</SectionTitle>

        <RaidWrapper>
            <Navbar>
                {Object.keys(raidData).map((raid: any) => {
                    return(<RaidLink
                        key={raid}
                        onClick={() => setSelected(raid)}
                        //@ts-ignore
                        style={{color: raidData[raid].color, background: selected === raid ? "black" : "#2c2c2c"}}>
                        {raid}
                    </RaidLink>)
                })}
            </Navbar>

            <DragList raid={selected} data={signups} />
        </RaidWrapper>
    </Wrapper>);
}

export default ManageRaids