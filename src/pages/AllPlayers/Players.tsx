import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {Reorder} from "framer-motion";
import {getClassData, getPlayers, getSignups, player, signups} from "../../firebase/utils";
import {db} from "../../firebase/init";
import {classData} from "../../data/classData";
import {raidData} from "../../data/raidData";
import {classfilter, lighttext, tilegb} from "../../styles/palette";
import {CharName, Lp, PlayerCharacter, PlayerCharacters, PlayerName, PlayersGrid, PlayerTile, Wrapper, CharClass, CharIlvl } from "./styles";
import getIlvlRating from "../ManageRaids/components/utils/getIlvlRating";

const Player: React.FC <{player: player}> = ({player}) => {
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

export const sortByName = (a: any, b: any) => {
    if (a.name < b.name)
        return -1
    if (a.name > b.name)
        return 1
    return 0
}

export const sortByPlayerName = (a: any, b: any) => {
    if (a.playerName < b.playerName)
        return -1
    if (a.playerName > b.playerName)
        return 1
    return 0
}

const Players = () => {
    const [players, setPlayers] = useState<Array<player>>([])

    useEffect(() => {
        getPlayers(db)
            // @ts-ignore
            .then(r => setPlayers(r.sort(sortByName)))
            .catch(err => console.log(err))
    }, [])

    return (
        <Wrapper>
            <PlayersGrid>
                {players.map(player => <Player key={player.name} player={player} />)}
            </PlayersGrid>
        </Wrapper>
    );
}

export default Players