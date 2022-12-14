import React, {useContext, useEffect, useState} from "react";
import {
    SecondaryTitle,
    Slot,
    Wrapper,
    Table,
    Group,
    Title,
    Roster,
    Lp,
    PName,
    TimeIndicator,
    Disclaimer
} from "./styles";
import compareGroupName from "../../utils/compareGroupName";
import calculateTimetable from "../../utils/calculateTimetable";
import isHighlighted from "../../utils/isHighlighted";
import {raidData} from "../../../../data/raidData";
import isInGroup from "../../utils/isInGroup";

const Timetable:React.FC <{selected: string, raid: any, highlightedPlayer: string}> = ({selected, raid, highlightedPlayer}) => {
    const [timetable, setTimetable] = useState([])
    const [raidPercent, setRaidPercent] = useState(0)
    // @ts-ignore
    let minutesPerSlot = raidData[selected].time
    let startHour = "20:00:00"
    let dStart = new Date(`2022-12-01T${startHour}`)

    useEffect(() => {
        setTimetable(calculateTimetable(Object.entries(raid).filter(el => el[0] !== "comment").sort(compareGroupName)))
        setRaidPercent(0)
    }, [raid])

    const calcRaidPercent = () => {
        let offset = 1 // UTC+1 == server time
        let localDate = new Date()
        let utcDate = localDate.getTime() + (localDate.getTimezoneOffset() * 60000)
        let date = new Date(utcDate + (3600000*offset))

        // let date = new Date('2022-09-22T21:30:00')
        let weekDay = date.getDay()
        let startTime = new Date(`${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${startHour}`)
        let finishTime = new Date(startTime.getTime() + (timetable.length)*minutesPerSlot*60000)

        // @ts-ignore
        let q = Math.abs(date-startTime)
        // @ts-ignore
        let d = Math.abs(finishTime-startTime)
        // @ts-ignore
        if (weekDay === raidData[selected].raidDay && date >= startTime){
            // console.log(utcDate, date, Math.round((q/d)*100))
            setRaidPercent(Math.round((q/d)*100))
        }
    }

    useEffect(() => {
        let timer = setInterval(() => {
            calcRaidPercent()
        }, 1000)

        return () => clearInterval(timer)
    }, [dStart, minutesPerSlot, selected, timetable.length])

    return (<Wrapper>
        <SecondaryTitle>Suggested timetable</SecondaryTitle>
        <Disclaimer>(start times are in server time and are not final)</Disclaimer>
        <Table>
            <TimeIndicator
                style={{
                    display: raidPercent < 1 || raidPercent > 100 ? "none" : "block",
                    //@ts-ignore
                    background: raidData[selected].color,
                    left: `${raidPercent}%`
                }} />

            {timetable.map((slot: any, i: number) => {
                let expectedStartTime = new Date(dStart.getTime() + i*minutesPerSlot*60000)
                let parsedDate = `${expectedStartTime.getHours().toString().padStart(2, '0')}:${expectedStartTime.getMinutes().toString().padStart(2, '0')}`

                return (<Slot key={i}>
                    {parsedDate}
                    {slot.map((group: any, j: number) => {
                        return(
                            <Group key={j} style={isInGroup(highlightedPlayer, group.players) ? {background: "#d7d4cf", color: "black"} : {}}>
                                <Title>{group.name}</Title>
                                {/*<Roster>*/}
                                {/*    {group.players.map((c: any, k: number) => <React.Fragment key={k}>*/}
                                {/*        <Lp>{k+1}. </Lp>*/}
                                {/*        <PName style={isHighlighted(highlightedPlayer, c.playerName) ? {background: "#d7d4cf", color: "black"} : {}}>*/}
                                {/*            <span>{c.playerName}</span>*/}
                                {/*        </PName>*/}
                                {/*    </React.Fragment>)}*/}
                                {/*</Roster>*/}
                            </Group>
                        )
                    })}
                    </Slot>)
                }
            )}
        </Table>
    </Wrapper>);
}

export default Timetable