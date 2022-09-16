import React, {useContext, useEffect, useState, PureComponent} from "react";
import {NotificationContext} from "../../contexts/NotificationContext";
import {PlayerContext} from "../../contexts/PlayerContext";
import {Card, ClassImage, IlvlHistory, LoadWrapper, PlayerName, Stats, Wrapper} from "./styles";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line} from 'recharts';
import {useParams} from "react-router-dom";
import {fetchPlayer} from "./utils/fetchPlayer";
import {classData} from "../../data/classData";
import {playerI} from "../../interfaces/playerI";
import Loading from "../../components/Loading";
import getWeekNumber from "../../utils/getWeekNumber";

const formatCharacterData = (characters: Array<any>, ilvlhistory: Array<any>) => {
    let dataRange = 7
    ilvlhistory = ilvlhistory.reverse()
    let result: Array<any>
    result = []

    let charHistory: any
    charHistory = {}

    let date = getWeekNumber(new Date())
    let year = date[0]
    let weekNo = date[1]

    let weekRangeArray = []
    for (let i=weekNo-dataRange+1;i<=weekNo;i++){
        weekRangeArray.push(i)
    }

    for (let character of characters) {
        charHistory[character.name] = []

        for (let week of weekRangeArray){
            let historicalData = ilvlhistory.find(el => el.year === year && el.week === week && el.charName === character.name)
            if (historicalData === undefined){
                historicalData = ilvlhistory.find(el => el.year <= year && el.week <= week && el.charName === character.name)
                if (historicalData !== undefined) {
                    charHistory[character.name].push(historicalData.ilvl)
                } else {
                    charHistory[character.name].push(character.ilvl)
                }
            } else {
                charHistory[character.name].push(historicalData.ilvl)
            }
        }
    }

    for (let i=0;i<dataRange;i++){
        let record: any
        record = {
            name: `Week ${weekRangeArray[i]}`,
        }
        for (let character of characters) {
            record[character.name] = charHistory[character.name][i]
        }
        result.push(record)
    }

    return result
}

const Profile = () => {
    const [setNotification] = useContext(NotificationContext)
    const [trackedPlayer] = useContext(PlayerContext)
    const {id} = useParams()
    const [player, setPlayer] = useState<any>(null)
    const [mainClass, setMainClass] = useState<string>("Berserker")
    const [ilvlData, setIlvlData] = useState<Array<any>>([])

    useEffect(() => {
        fetchPlayer(id || "", setPlayer, setNotification)
    }, [id, setNotification])

    useEffect(() => {
        setMainClass(player?.characters?.[0].class || "Berserker")
        setIlvlData(formatCharacterData(player?.characters || [], player?.ilvlHistory || []))
    }, [player])

    if (player === null) return(<LoadWrapper><Loading /></LoadWrapper>)

    return (
        <Wrapper>
            <Card>
                <ClassImage
                    //@ts-ignore
                    src={classData[mainClass].image}
                    //@ts-ignore
                    style={{filter: `brightness(50%) sepia(100) saturate(10) grayscale(0.7) hue-rotate(${classData[mainClass].imageHue}deg)`}}
                />
                <PlayerName>{player.name}</PlayerName>
            </Card>

            <Stats>
                <IlvlHistory>
                    <div style={{ width: 800, height: 300 }}>
                        <ResponsiveContainer>
                            <LineChart
                                data={ilvlData}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis type="number" domain={['dataMin - 15', 'dataMax + 15']} />
                                <Tooltip />
                                {/*@ts-ignore*/}
                                {player.characters.map((char: any) => <Line key={char.name} type="monotone" strokeWidth={2} dataKey={char.name} stroke={classData[char.class].color} fill={classData[char.class].color} />)}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </IlvlHistory>

            </Stats>
        </Wrapper>
    )
}

export default Profile