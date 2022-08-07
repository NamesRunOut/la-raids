import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {Reorder, useMotionValue} from "framer-motion";
import {getPlayers, getSignups, player, raids, signups} from "../../firebase/utils";
import {db} from "../../firebase/init";
import { raidData } from "../../data/raidData";
import { Character, Characters, Group, Player, PName, Raid, Title } from "./styles";
import DragList, { signedupgroupname } from "./components/Raid/Raid";
import {doc, Firestore, getDoc} from "firebase/firestore";
import {getSignup} from "../ManageRaids/ManageRaids";

const Wrapper = styled.div`
  padding: 1rem;
`

const Navbar = styled.nav`
  padding: 0.25rem 0.25rem 0 0.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
  background: rgba(0, 0, 0, 0.2);
`

const RaidLink = styled.div`
  text-decoration: none;
  color: black;
  width: max-content;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;

  :hover {
    background: rgba(0, 0, 0, 0.2);
  }
`

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

const Home = () => {
    const [selected, setSelected] = useState(Object.keys(raidData)[0])
    const [raid, setRaid] = useState<any>({comment: ""})

    useEffect(() => {
        getRaid(db, selected)
            .then(r => setRaid(r))
            .catch(err => console.log(err))
    }, [selected])

    return (<>
        <div>Upcoming raids</div>

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

        <Wrapper>
            <Raid>
                {Object.entries(raid).map((c: any) => {
                    let name = c[0]
                    let players = c[1]
                    if (name === "comment") return (<></>)
                    else {
                        return(
                            <Group>
                                <Title>{name}</Title>
                                <Player>
                                    <PName>{name}</PName>
                                    <Characters>
                                        {/*@ts-ignore*/}
                                        {players.map((c:any) =>
                                            <Character>
                                                <div>{c.name}</div>
                                                <div>{c.class}</div>
                                                <div>{c.ilvl}</div>
                                            </Character>
                                        )}
                                    </Characters>
                                </Player>
                            </Group>
                        )
                    }
                }
                )}
            </Raid>
        </Wrapper>
    </>);
}

export default Home