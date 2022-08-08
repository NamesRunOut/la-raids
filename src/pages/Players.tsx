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
  color: white;
`

const PlayersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const PlayerTile = styled.div`
  flex: 1 1 20%;
  border-radius: 0.5rem;
  background: #2c2c2c;
  margin: 0.25rem;
  padding: 0 0.5rem;

  @media (max-width: 468px){
    flex: 0 1 100%;
  }
`

const PlayerName = styled.h3`
  padding: 0.25rem;
  margin: 0;
`

const PlayerCharacters = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`

const PlayerCharacter = styled.div`
  border-radius: 0.25rem;
  background: #151515;
  margin: 0.25rem 0;
  padding: 0.25rem;
  display: grid;
  grid-template-columns: max-content auto 1fr auto;
`

const CharName = styled.div`
  padding: 0 0.25rem;
`

const CharClass = styled.div`
  margin: auto;
`

const CharIlvl = styled.div``

const Player: React.FC <{player: player}> = ({player}) => {
    let i=1
    return(
        <PlayerTile>
            <PlayerName>{player.name}</PlayerName>
            <PlayerCharacters>
                {player.characters?.map(char =>
                    <PlayerCharacter>
                        <div>{i++}.</div>
                        <CharName>{char.name}</CharName>
                        {/*@ts-ignore*/}
                        <CharClass style={{color: classData[char.class].color || "white", filter: "brightness(2.69)"}}>{char.class}</CharClass>
                        {/*@ts-ignore*/}
                        <CharIlvl style={{color: getIlvlRating(char.ilvl, raidData["Argos_p3"].minlvl || 0) || "white", filter: "brightness(1.25)"}}>{char.ilvl}</CharIlvl>
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