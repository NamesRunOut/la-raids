import React, {useEffect, useState} from "react";
import {db} from "../../firebase/init";
import { raidData } from "../../data/raidData";
import { Character, Group, Navbar, PageWrapper, Raid, RaidLink, RaidsWrapper, Title, Wrapper, Comment, Roster, Pilvl, PClass, PName, Lp } from "./styles";
import {compareGroupName, getRaid} from "./utils";
import {classData} from "../../data/classData";
import {getIlvlRating} from "../ManageRaids/components/Raid/Raid";

const Home = () => {
    const [selected, setSelected] = useState(Object.keys(raidData)[0])
    const [raid, setRaid] = useState<any>({comment: ""})

    useEffect(() => {
        getRaid(db, selected)
            .then(r => setRaid(r))
            .catch(err => console.log(err))
    }, [selected])

    return (<PageWrapper>
        <Title>Upcoming raids</Title>

        <RaidsWrapper>
            <Navbar>
                {Object.keys(raidData).map((raid: any) => {
                    return(<RaidLink
                        key={raid}
                        onClick={() => setSelected(raid)}
                        //@ts-ignore
                        style={{color: raidData[raid].color || "white", background: selected === raid ? "#2c2c2c" : "#151515"}}>
                        {raid}
                    </RaidLink>)
                })}
            </Navbar>

            <Wrapper>
                <Raid>
                    <Comment>{raid["comment"]}</Comment>
                    {Object.entries(raid).sort(compareGroupName).map((c: any) => {
                        let name = c[0]
                        let players = c[1]
                        let i=1
                            if (name === "comment") return (<></>)
                            else {
                                return(
                                    <Group key={name}>
                                        <Title>{name}</Title>
                                        <Roster>
                                            {players.map((c:any) => <React.Fragment key={c.name}>
                                                <Lp>{i++}.</Lp>
                                                <PName>{c.name}</PName>
                                                {/*@ts-ignore*/}
                                                <PClass style={{color: classData[c.class].color || "white", filter: "brightness(2.69)"}}>{c.class}</PClass>
                                                {/*@ts-ignore*/}
                                                <Pilvl style={{color: getIlvlRating(c.ilvl, raidData[selected].minlvl || 0) || "white", filter: "brightness(1.25)"}}>{c.ilvl}</Pilvl>
                                            </React.Fragment>)}
                                        </Roster>
                                    </Group>
                                )
                            }
                        }
                    )}
                </Raid>
            </Wrapper>
        </RaidsWrapper>
    </PageWrapper>);
}

export default Home