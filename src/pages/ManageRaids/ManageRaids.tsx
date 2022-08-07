import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {Reorder, useMotionValue} from "framer-motion";
import {getPlayers, getSignups, player, raids, signups} from "../../firebase/utils";
import {db} from "../../firebase/init";
import { raidData } from "../../data/raidData";
import { Character, Characters, Player, PName, Signups, Title } from "./styles";
import DragList, { signedupgroupname } from "./components/Raid/Raid";
import {doc, Firestore, getDoc, setDoc} from "firebase/firestore";

const Wrapper = styled.div`
  padding: 1rem;
`

const RaidWrapper = styled.div`

`

const Navbar = styled.nav`
  padding: 0.25rem 0.25rem 0 0.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
  background: rgba(0,0,0,0.2);
`

const RaidLink = styled.div`
  text-decoration: none;
  color: black;
  width: max-content;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;

  :hover {
    background: rgba(0,0,0,0.2);
  }
`

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
        alert("Data cleared")
    }

    return (<Wrapper>
        <div>General settings</div>
        <div onClick={clearRaidsAndSignups}>Clear assignments and sign ups from all raids</div>

        <hr />
        <div>Individual raid settings</div>

        <RaidWrapper>
            <Navbar>
                {Object.keys(raidData).map((raid: any) => {
                    return(<RaidLink
                        key={raid}
                        onClick={() => setSelected(raid)}
                        //@ts-ignore
                        style={{color: raidData[raid].color, background: selected === raid ? "#1d1e1f" : "rgba(0,0,0,0.1)"}}>
                        {raid}
                    </RaidLink>)
                })}
            </Navbar>

            <div>{signups.comment}</div>

            {/* TODO add sort signups by lvl and class */}
            <DragList raid={selected} data={signups} />
        </RaidWrapper>
    </Wrapper>);
}

export default ManageRaids