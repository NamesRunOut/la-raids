import React, {useContext, useEffect, useState} from "react";
import {raids, signups} from "../../firebase/utils";
import {db} from "../../firebase/init";
import {raidData} from "../../data/raidData";
import {Navbar, RaidLink, RaidWrapper, SectionTitle, Wrapper} from "./styles";
import DragList from "./components/DragList";
import {doc, Firestore, getDoc, setDoc} from "firebase/firestore";
import {NotificationContext} from "../../contexts/NotificationContext";
import {Action} from './components/styles'

export const getSignup = async (db: Firestore, raid: string) => {
    let result: any = {
        comment: "",
        players: []
    }
    const signupRef = doc(db, "signups", raid)
    const sSnap = await getDoc(signupRef)

    const raidRef = doc(db, "raids", raid);
    const rSnap = await getDoc(raidRef);

    if (sSnap.exists()) {
        if (rSnap.exists()) {
            result.comment = rSnap.data().comment
            let signups = sSnap.data().players
            for (let [key, value] of Object.entries(rSnap.data())){
                key = key.toLowerCase()
                if (key === "comment") continue
                let tmp = []
                // if players canceled signup, remove from group
                // get fresh data from signups, replace
                for (let player of value){
                    let pIdx = signups.findIndex((el: any) => el.name === player.name && el.playerName === player.playerName)
                    if (pIdx !== -1) {
                        tmp.push(signups[pIdx])
                        signups.splice(pIdx, 1)
                    }
                }
                result[key] = [...tmp]
            }
            result.players = [...signups]
            return result
        }
        return sSnap.data()
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
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure you want to clear all raid and signup data?")) {
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
    }

    return (<Wrapper>
        <SectionTitle style={{marginTop: "0"}}>General settings</SectionTitle>
        <Action onClick={clearRaidsAndSignups}>Clear assignments and sign ups from all raids</Action>

        <SectionTitle>Individual raid settings</SectionTitle>

        <RaidWrapper>
            <Navbar>
                {Object.keys(raidData).map((raid: any) => {
                    return(<RaidLink
                        key={raid}
                        onClick={() => setSelected(raid)}
                        //@ts-ignore
                        style={{color: raidData[raid].color, background: selected === raid ? "black" : "#2c2c2c"}}>
                        {/*@ts-ignore*/}
                        {raidData[raid].name}
                    </RaidLink>)
                })}
            </Navbar>

            <DragList raid={selected} data={signups} />
        </RaidWrapper>
    </Wrapper>);
}

export default ManageRaids