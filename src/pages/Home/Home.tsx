import React, {useContext, useEffect, useState} from "react";
import {db} from "../../firebase/init";
import {raidData} from "../../data/raidData";
import {
    Calendar,
    Comment,
    Copy,
    Day,
    Group,
    Lp,
    Navbar,
    PageWrapper,
    PClass,
    PClassImage,
    PclassWrapper,
    Pilvl,
    PName,
    Raid,
    RaidLink,
    RaidsWrapper,
    Roster,
    SecondaryTitle,
    Setting,
    Title,
    Wrapper
} from "./styles";
import {compareGroupName, getRaid} from "./utils";
import {classData} from "../../data/classData";
import {classfilter} from "../../styles/palette";
import getIlvlRating from "../ManageRaids/utils/getIlvlRating";
import Loading from "../../components/Loading";
import {PlayerContext} from "../../contexts/PlayerContext";

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

    const [player] = useContext(PlayerContext)
    const [highlightedPlayer, setHighlightedPlayer] = useState(player)

    //settings
    const [showCopy, setShowCopy] = useState(false)
    const [showClassIcon, setShowClassIcon] = useState(false)
    const [showClass, setShowClass] = useState(true)

    const setLocalShowClassIcon = (val: boolean) => {
        window.localStorage.setItem('la-raids-show-class-icon', val.toString())
        setShowClassIcon(val)
    }

    const setLocalShowClass = (val: boolean) => {
        window.localStorage.setItem('la-raids-show-class', val.toString())
        setShowClass(val)
    }

    useEffect(() => {
        getRaid(db, selected)
            .then(r => setRaid(r))
            .catch(err => console.log(err))
    }, [selected])

    useEffect(() => {
        const localShowClassIcon = window.localStorage.getItem('la-raids-show-class-icon')
        localShowClassIcon && setShowClassIcon(localShowClassIcon === 'true')

        const localShowClass = window.localStorage.getItem('la-raids-show-class')
        localShowClass && setShowClass(localShowClass === "true")
    }, [])

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
                                        <PName onClick={() => highlightedPlayer === c.playerName ? setHighlightedPlayer("") : setHighlightedPlayer(c.playerName)}
                                               style={isHighlighted(highlightedPlayer, c.playerName) ? {
                                                   background: "#d7d4cf",
                                                   color: "black"
                                               } : {}}>
                                            {showCopy && <Copy onClick={() => {navigator.clipboard.writeText(c.name)}}>copy</Copy>}
                                            <span>{c.name}</span>
                                        </PName>

                                        <PclassWrapper>
                                            {showClassIcon && <PClassImage
                                                //@ts-ignore
                                                src={classData[c.class].image}
                                                //@ts-ignore
                                                style={{filter: `brightness(50%) sepia(100) saturate(10) grayscale(0.7) hue-rotate(${classData[c.class].imageHue}deg)`}}
                                            />}
                                            {showClass && <PClass style={{
                                                //@ts-ignore
                                                color: classData[c.class].color || "black",
                                                filter: classfilter
                                            }}>{c.class}</PClass>}
                                        </PclassWrapper>


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

        <SecondaryTitle>Settings</SecondaryTitle>
        <Setting><input type="checkbox" checked={showCopy} onChange={e => setShowCopy(e.target.checked)} /><div>Show copy button next to player names</div></Setting>
        <Setting><input type="checkbox" checked={showClassIcon} onChange={e => setLocalShowClassIcon(e.target.checked)} /><div>Show class icon</div></Setting>
        <Setting><input type="checkbox" checked={showClass} onChange={e => setLocalShowClass(e.target.checked)} /><div>Show class name</div></Setting>
    </PageWrapper>);
}

export default Home