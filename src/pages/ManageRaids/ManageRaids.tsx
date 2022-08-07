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

let pdata = [
    {
        name: "A",
        characters: [
            {
                name: 'A1',
                class: "Bard",
                ilvl: 1
            },
            {
                name: 'A2',
                class: "Bard",
                ilvl: 1
            },
            {
                name: 'A3',
                class: "Bard",
                ilvl: 1000
            }
        ]
    },
    {
        name: "B",
        characters: [
            {
                name: 'B1',
                class: "Bard",
                ilvl: 699
            }
        ]
    },
    {
        name: "C",
        characters: [
            {
                name: 'C1',
                class: "Bard",
                ilvl: 1
            },
            {
                name: 'C2',
                class: "Bard",
                ilvl: 1
            },
            {
                name: 'C3',
                class: "Bard",
                ilvl: 1
            },
            {
                name: 'C4',
                class: "Bard",
                ilvl: 1
            },
            {
                name: 'C5',
                class: "Bard",
                ilvl: 1
            }
        ]
    }
]

let sdata = [
    {
        raid: "Vykas_hm",
        data: "05-08-20222",
        signups: pdata,
        roster: []
    }
]

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
const initialItems = [{p: "🍅 Tomato"}, {p: "🥒 Cucumber"}, {p: "🧀 Cheese"}, {p: "🥬 Lettuce"}];
let data = {
    signedup: [
        {
            id: "0",
            playerName: "Na",
            name: 'A1',
            class: "Bard",
            ilvl: 1370
        },
        {
            id: "1",
            playerName: "Na1",
            name: '3',
            class: "Shadowhunter",
            ilvl: 1415
        },
        {
            id: "2",
            playerName: "Na21",
            name: 'A4',
            class: "Gunlancer",
            ilvl: 1475
        },
        {
            id: "3",
            playerName: "Na3",
            name: 'A5',
            class: "Sorceress",
            ilvl: 1445
        },
        {
            id: "4",
            playerName: "Na3",
            name: 'A6',
            class: "Gunslinger",
            ilvl: 1460
        },
        {
            id: "5",
            playerName: "Na5",
            name: 'A7',
            class: "Berserker",
            ilvl: 1460
        },
        {
            id: "6",
            playerName: "Na6",
            name: 'A8',
            class: "Bard",
            ilvl: 1445
        },
        {
            id: "7",
            playerName: "Na7",
            name: 'A2',
            class: "Bard",
            ilvl: 1370
        }
    ],
    group1: [],
    group2: []
}

const Group = () => {
    const [items, setItems] = useState([...signedin])

    return (
        <Reorder.Group axis="y" values={items} onReorder={setItems}>
            {items.map((item: any) => (
                <Reorder.Item key={item.playerName} id={item.lp} value={item}>
                    <div>{item.name}</div>
                    {/* <div>{pl.name}</div> */}
                </Reorder.Item>
            ))}
        </Reorder.Group>
    )
}

let signedin = [
    {
        lp: 0,
        playerName: "Na",
        name: 'A1',
        class: "Bard",
        ilvl: 1
    },
    {
        lp: 1,
        playerName: "Na1",
        name: '3',
        class: "Bard",
        ilvl: 1
    },
    {
        lp: 2,
        playerName: "Na21",
        name: 'A4',
        class: "Bard",
        ilvl: 1
    },
    {
        lp: 3,
        playerName: "Na3",
        name: 'A5',
        class: "Bard",
        ilvl: 1
    },
    {
        lp: 4,
        playerName: "Na3",
        name: 'A6',
        class: "Bard",
        ilvl: 1
    },
    {
        lp: 5,
        playerName: "Na5",
        name: 'A7',
        class: "Bard",
        ilvl: 1
    },
    {
        lp: 6,
        playerName: "Na6",
        name: 'A8',
        class: "Bard",
        ilvl: 1
    },
    {
        lp: 7,
        playerName: "Na7",
        name: 'A2',
        class: "Bard",
        ilvl: 1
    }
]

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