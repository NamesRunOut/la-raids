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
import {classData} from "../../data/classData";
import {classfilter} from "../../styles/palette";
import getIlvlRating from "../ManageRaids/utils/getIlvlRating";
import Loading from "../../components/Loading";
import {PlayerContext} from "../../contexts/PlayerContext";
import getRaidForToday from "./utils/getRaidForToday";
import getRaid from "./utils/getRaid";
import compareGroupName from "./utils/compareGroupName";
import isHighlighted from "./utils/isHighlighted";
import calculateTimetable from "./utils/calculateTimetable";
import Timetable from "./components/Timetable/Timetable";
import { doc, onSnapshot } from "firebase/firestore";

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
        const unsub = onSnapshot(doc(db, "raids", selected), (doc) => {
            // console.log(doc.exists(), doc.data())
            if (doc.exists()) {
                setRaid(doc.data())
                return doc.data()
            } else {
                console.log("No such raid!", selected)
                return {comment: ""}
            }
        })

        return () => unsub()
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

        <Timetable selected={selected} raid={raid} highlightedPlayer={highlightedPlayer} />

        <RaidsWrapper>
            <SecondaryTitle>Group Details</SecondaryTitle>
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