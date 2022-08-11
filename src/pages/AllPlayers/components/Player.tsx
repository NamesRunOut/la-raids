import React from "react";
import {CharClass, CharIlvl, CharName, Lp, PlayerCharacter, PlayerCharacters, PlayerName, PlayerTile} from "../styles";
import {classData} from "../../../data/classData";
import {classfilter} from "../../../styles/palette";
import getIlvlRating from "../../ManageRaids/utils/getIlvlRating";
import {raidData} from "../../../data/raidData";
import { rawPlayerI } from "../../../interfaces/rawPlayerI";

const Player: React.FC <{player: rawPlayerI}> = ({player}) => {
    let i=1
    return(
        <PlayerTile>
            <PlayerName>{player.name}</PlayerName>
            <PlayerCharacters>
                {player.characters?.map(char =>
                    <PlayerCharacter>
                        <Lp>{i++}.</Lp>
                        <CharName>{char.name}</CharName>
                        {/*@ts-ignore*/}
                        <CharClass style={{color: classData[char.class].color || "black", filter: classfilter}}>{char.class}</CharClass>
                        {/*@ts-ignore*/}
                        <CharIlvl style={{color: getIlvlRating(char.ilvl, raidData["Argos_p3"].minlvl || 0) || "black"}}>{char.ilvl}</CharIlvl>
                    </PlayerCharacter>)}
            </PlayerCharacters>
        </PlayerTile>
    )
}

export default Player