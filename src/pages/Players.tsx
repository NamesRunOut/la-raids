import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {Reorder} from "framer-motion";
import {getClassData, getPlayers, getSignups, player, signups} from "../firebase/utils";
import {db} from "../firebase/init";
import {classData} from "../data/classData";
import {getIlvlRating} from "./ManageRaids/components/Raid/Raid";
import {raidData} from "../data/raidData";

const Wrapper = styled.div`
  padding: 1rem;
  color: #fefefe;
`

const PlayersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const PlayerTile = styled.div`
  flex: 1 1 min-content;
  border-radius: 0.5rem;
  background: #2c2c2c;
  margin: 0.25rem;
  padding: 0 0.5rem;
`

const PlayerName = styled.h3`
  padding: 0.25rem;
  margin-bottom: 0;
  margin-top: 0.5rem;
`

const PlayerCharacters = styled.div`
`

const PlayerCharacter = styled.div`
  border-radius: 0.25rem;
  //background: #151515;
  margin: 0.25rem 0;
  padding: 0.25rem;
  
  display: grid;
  grid-template-columns: min-content 1fr 1fr min-content;
  gap: 0.1rem;
  grid-column-gap: 0.5rem;
`

const CharName = styled.div`
`

const CharClass = styled.div`
`

const CharIlvl = styled.div``

const Lp = styled.div`
  margin-right: 0.5rem;
`

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
                        <CharClass style={{color: classData[char.class].color || "black", filter: "brightness(2.69) grayscale(0.5)"}}>{char.class}</CharClass>
                        {/*@ts-ignore*/}
                        <CharIlvl style={{color: getIlvlRating(char.ilvl, raidData["Argos_p3"].minlvl || 0) || "black"}}>{char.ilvl}</CharIlvl>
                    </PlayerCharacter>)}
            </PlayerCharacters>
        </PlayerTile>
    )
}

const Players = () => {
    const [players, setPlayers] = useState<Array<player>>([])

    useEffect(() => {
        getPlayers(db)
            // @ts-ignore
            .then(r => setPlayers(r))
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