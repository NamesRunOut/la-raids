import React, {useContext} from "react";
import {CharClass, CharIlvl, CharName, Lp, PClassImage, PlayerCharacter, PlayerCharacters, PlayerName, PlayerTile} from "../styles";
import {classData} from "../../../data/classData";
import {classfilter} from "../../../styles/palette";
import getIlvlRating from "../../ManageRaids/utils/getIlvlRating";
import {raidData} from "../../../data/raidData";
import {rawPlayerI} from "../../../interfaces/rawPlayerI";
import {useNavigate} from "react-router-dom";
import getPlayerId from "../../EditPlayer/utils/getPlayerId";
import {db} from "../../../firebase/init";
import {NotificationContext} from "../../../contexts/NotificationContext";

const Player: React.FC<{ player: rawPlayerI }> = ({player}) => {
    const [setNotification] = useContext(NotificationContext)
    const navigate = useNavigate()

    const redirectToPlayerProfile = () => {
        getPlayerId(db, player.name)
            .then(([pid, data]) => {
                navigate(`/player/${pid}`)
            })
            .catch(err => {
                setNotification({color: "lightcoral", message: "Couldn't find selected player"})
            })
    }

    return (
        <PlayerTile onClick={redirectToPlayerProfile}>
            <PlayerName>{player.name}</PlayerName>
            <PlayerCharacters>
                {player.characters?.map((char, i) =>
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
        </PlayerTile>
    )
}

export default Player