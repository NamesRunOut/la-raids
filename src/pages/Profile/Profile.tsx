import React, {useContext, useEffect, useState, PureComponent} from "react";
import {NotificationContext} from "../../contexts/NotificationContext";
import {PlayerContext} from "../../contexts/PlayerContext";
import {Card, CharName, CharIlvl, ClassImage, Ilvl, LoadWrapper, Lp,
    PClassImage, PlayerCharacter, PlayerCharacters, PlayerName, SecondaryTitle, Wrapper, BigPlayerName, Characters, Stats} from "./styles";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line} from 'recharts';
import {useParams} from "react-router-dom";
import {fetchPlayer} from "./utils/fetchPlayer";
import {classData} from "../../data/classData";
import {playerI} from "../../interfaces/playerI";
import Loading from "../../components/Loading";
import getWeekNumber from "../../utils/getWeekNumber";
import formatCharacterData from "./utils/formatCharacterData";
import IlvlHistory from "./components/IlvlHistory";
import getIlvlRating from "../ManageRaids/utils/getIlvlRating";
import {raidData} from "../../data/raidData";

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
                <BigPlayerName>{player.name}</BigPlayerName>
            </Card>

            <Stats>
                <Ilvl>
                    <SecondaryTitle>Item lvl History</SecondaryTitle>
                    <IlvlHistory player={player} ilvlData={ilvlData} />
                </Ilvl>

                <Characters>
                    <SecondaryTitle>Characters</SecondaryTitle>
                    <PlayerCharacters>
                        {player.characters?.map((char: any, i: number) =>
                            <PlayerCharacter>
                                <Lp>{i+1}.</Lp>
                                <PClassImage
                                    //@ts-ignore
                                    src={classData[char.class].image}
                                    //@ts-ignore
                                    style={{filter: `brightness(50%) sepia(100) saturate(10) grayscale(0.7) hue-rotate(${classData[char.class].imageHue}deg)`}}
                                />
                                <CharName>{char.name}</CharName>
                                {/*@ts-ignore*/}
                                <CharIlvl
                                    style={{color: getIlvlRating(char.ilvl, raidData["Argos_p3"].minlvl || 0) || "black"}}>{char.ilvl}</CharIlvl>
                            </PlayerCharacter>)}
                    </PlayerCharacters>
                </Characters>

            </Stats>
        </Wrapper>
    )
}

export default Profile