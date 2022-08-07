import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {Reorder, useMotionValue} from "framer-motion";
import {getPlayers, getSignups, player, raids, signups} from "../../firebase/utils";
import {db} from "../../firebase/init";
import { raidData } from "../../data/raidData";
import { Character, Characters, Player, PName, Signups, Title } from "./styles";
import DragList, { signedupgroupname } from "./components/Raid/Raid";

const Wrapper = styled.div`
  padding: 1rem;
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

const Home = () => {
    const [players, setPlayers] = useState(pdata)//useState<Array<player>>([])
    const [signups, setSignups] = useState(data)//useState<Array<signups>>([])
    // const [playerId, setPlayerId] = useState<string>("")
    const [selected, setSelected] = useState(Object.keys(raidData)[0])

    // useEffect(() => {
    //     let id = JSON.parse(localStorage.getItem('playerId') as string)
    //     if (id) {
    //         setPlayerId(id);
    //     }
    // }, [playerId])

    useEffect(() => {
        // TODO tmp for tests
        getPlayers(db)
        .then(r => {
            let tmp = {[signedupgroupname]: [], group1: [], group2: [], group3: []}
            let tmp2 = []
            let i=0
            for (let p of r){
                let tc = []
                for (let c of p.characters){
                    tc.push({
                        ...c,
                        playerName: p.name,
                        id: i.toString()
                    })
                    i++
                }
                tmp2.push(tc)
            }
            tmp2 = tmp2.flat()
            //@ts-ignore
            tmp[signedupgroupname] = tmp2
            console.log(tmp)
            // @ts-ignore
            setPlayers(r)
            // @ts-ignore
            setSignups(tmp)
        })
        .catch(err => console.log(err))

        // getPlayers(db)
        //     // @ts-ignore
        //     .then(r => setPlayers(r))
        //     .catch(err => console.log(err))

        // getSignups(db)
        //     .then(r => {
        //         // console.log(r)
        //         // @ts-ignore
        //         setSignups(r)
        //     })
        //     .catch(err => console.log(err))
    }, [])

    const addPlayer = () => {

    }

    return (<>
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
            {/* <div>
            {sdata[0]?..map(raid => 
                <></>
            )}
            </div> */}

            {/* <Group /> */}
            <div>Clear assignments and sign ups from all raids</div>
            <hr />

            {/* context for dis */}
            {/* TODO add sort signups by lvl and class */}
            <DragList raid={selected} data={signups} />
{/*             
            <Signups>
                <Title>Candidates</Title>
                {sdata[0]?.signups.map(p => 
                    <Player>
                        <PName>{p.name}</PName>
                        <Characters>
                            {p.characters.map(c => 
                                <Character>
                                    <div>+</div>
                                    <div>{c.name}</div>
                                    <div>{c.class}</div>
                                    <div>{c.ilvl}</div>
                                    <div>-</div>
                                </Character>
                                )}
                        </Characters>
                    </Player>
                    )}
            </Signups> */}
        </Wrapper>
    </>);
}

export default Home