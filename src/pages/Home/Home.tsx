import React, {useEffect, useState} from "react";
import {db} from "../../firebase/init";
import {raidData} from "../../data/raidData";
import {
    Calendar,
    Comment,
    Day,
    Group,
    Lp,
    Navbar,
    PageWrapper,
    PClass,
    Pilvl,
    PName,
    Raid,
    RaidLink,
    RaidsWrapper,
    Roster,
    SecondaryTitle,
    Title,
    Wrapper
} from "./styles";
import {compareGroupName, getRaid} from "./utils";
import {classData} from "../../data/classData";
import {classfilter} from "../../styles/palette";
import getIlvlRating from "../ManageRaids/utils/getIlvlRating";
import Loading from "../../components/Loading";

const isHighlighted = (highlightedPlayer: string, playerName: string) => {
    return highlightedPlayer === playerName
}

const getRaidForToday = () => {
    let day = (new Date()).getDay()
    let raid = Object.entries(raidData).find(el => el[1].raidDay === day)
    if (raid === undefined) return Object.keys(raidData)[0]
    return raid[0]
}

const Home = () => {
    const [selected, setSelected] = useState(getRaidForToday())
    const [raid, setRaid] = useState<any>({comment: ""})
    const [highlightedPlayer, setHighlightedPlayer] = useState("")

    useEffect(() => {
        getRaid(db, selected)
            .then(r => setRaid(r))
            .catch(err => console.log(err))
    }, [selected])

    return (<PageWrapper>
        <Title>Upcoming raids</Title>

        <Calendar>
            <Day>
                <b>Monday</b>
                {Object.entries(raidData).filter(el => el[1].raidDay === 1).map((raid: any) => {
                    return (<RaidLink
                        key={raid[0]}
                        onClick={() => setSelected(raid[0])}
                        style={{
                            color: raid[1].color || "white",
                            background: selected === raid[0] ? "black" : "#2c2c2c",
                            padding: selected === raid[0] ? "0.25rem 0.5rem" : "0.25rem 0"
                        }}>
                        {raid[1].name}
                    </RaidLink>)
                })}
            </Day>

            <Day>
                <b>Tuesday</b>
                {Object.entries(raidData).filter(el => el[1].raidDay === 2).map((raid: any) => {
                    return (<RaidLink
                        key={raid[0]}
                        onClick={() => setSelected(raid[0])}
                        style={{
                            color: raid[1].color || "white",
                            background: selected === raid[0] ? "black" : "#2c2c2c",
                            padding: selected === raid[0] ? "0.25rem 0.5rem" : "0.25rem 0"
                        }}>
                        {raid[1].name}
                    </RaidLink>)
                })}
            </Day>

            <Day>
                <b>Wednesday</b>
                {Object.entries(raidData).filter(el => el[1].raidDay === 3).map((raid: any) => {
                    return (<RaidLink
                        key={raid[0]}
                        onClick={() => setSelected(raid[0])}
                        style={{
                            color: raid[1].color || "white",
                            background: selected === raid[0] ? "black" : "#2c2c2c",
                            padding: selected === raid[0] ? "0.25rem 0.5rem" : "0.25rem 0"
                        }}>
                        {raid[1].name}
                    </RaidLink>)
                })}
            </Day>

            <Day>
                <b>Thursday</b>
                {Object.entries(raidData).filter(el => el[1].raidDay === 4).map((raid: any) => {
                    return (<RaidLink
                        key={raid[0]}
                        onClick={() => setSelected(raid[0])}
                        style={{
                            color: raid[1].color || "white",
                            background: selected === raid[0] ? "black" : "#2c2c2c",
                            padding: selected === raid[0] ? "0.25rem 0.5rem" : "0.25rem 0"
                        }}>
                        {raid[1].name}
                    </RaidLink>)
                })}
            </Day>

            <Day>
                <b>Friday</b>
                {Object.entries(raidData).filter(el => el[1].raidDay === 5).map((raid: any) => {
                    return (<RaidLink
                        key={raid[0]}
                        onClick={() => setSelected(raid[0])}
                        style={{
                            color: raid[1].color || "white",
                            background: selected === raid[0] ? "black" : "#2c2c2c",
                            padding: selected === raid[0] ? "0.25rem 0.5rem" : "0.25rem 0"
                        }}>
                        {raid[1].name}
                    </RaidLink>)
                })}
            </Day>

            <Day>
                <b>Saturday</b>
                {Object.entries(raidData).filter(el => el[1].raidDay === 6).map((raid: any) => {
                    return (<RaidLink
                        key={raid[0]}
                        onClick={() => setSelected(raid[0])}
                        style={{
                            color: raid[1].color || "white",
                            background: selected === raid[0] ? "black" : "#2c2c2c",
                            padding: selected === raid[0] ? "0.25rem 0.5rem" : "0.25rem 0"
                        }}>
                        {raid[1].name}
                    </RaidLink>)
                })}
            </Day>

            <Day>
                <b>Sunday</b>
                {Object.entries(raidData).filter(el => el[1].raidDay === 0).map((raid: any) => {
                    return (<RaidLink
                        key={raid[0]}
                        onClick={() => setSelected(raid[0])}
                        style={{
                            color: raid[1].color || "white",
                            background: selected === raid[0] ? "black" : "#2c2c2c",
                            padding: selected === raid[0] ? "0.25rem 0.5rem" : "0.25rem 0"
                        }}>
                        {raid[1].name}
                    </RaidLink>)
                })}
            </Day>
        </Calendar>

        <RaidsWrapper>
            {/*<Navbar>*/}
            {/*    {Object.keys(raidData).map((raid: any) => {*/}
            {/*        return (<RaidLink*/}
            {/*            key={raid}*/}
            {/*            onClick={() => setSelected(raid)}*/}
            {/*            style={{*/}
            {/*                //@ts-ignore*/}
            {/*                color: raidData[raid].color || "white",*/}
            {/*                background: selected === raid ? "black" : "#2c2c2c"*/}
            {/*            }}>*/}
            {/*            /!*@ts-ignore*!/*/}
            {/*            {raidData[raid].name}*/}
            {/*        </RaidLink>)*/}
            {/*    })}*/}
            {/*</Navbar>*/}

            <SecondaryTitle>Groups</SecondaryTitle>

            <Raid>
                <Comment>{raid["comment"]}</Comment>
                {Object.entries(raid).filter(el => el[0] !== "comment").sort(compareGroupName).map((c: any) => {
                        let name = c[0]
                        let players = c[1]
                        let i = 1
                        return (
                            <Group key={name}>
                                <Title>{name}</Title>
                                <Roster>
                                    {players.map((c: any) => <React.Fragment key={c.name}>
                                        <Lp>{i++}.</Lp>
                                        <PName onClick={() => setHighlightedPlayer(c.playerName)}
                                               style={isHighlighted(highlightedPlayer, c.playerName) ? {
                                                   background: "#d7d4cf",
                                                   color: "black"
                                               } : {}}>{c.name}</PName>
                                        <PClass style={{
                                            //@ts-ignore
                                            color: classData[c.class].color || "black",
                                            filter: classfilter
                                        }}>{c.class}</PClass>

                                        <Pilvl
                                            //@ts-ignore
                                            style={{color: getIlvlRating(c.ilvl, raidData[selected].minlvl || 0) || "black"}}>{c.ilvl}</Pilvl>
                                    </React.Fragment>)}
                                </Roster>
                            </Group>
                        )
                    }
                )}
            </Raid>
        </RaidsWrapper>
    </PageWrapper>);
}

export default Home