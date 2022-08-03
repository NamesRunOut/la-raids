import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {Reorder} from "framer-motion";
import {getClassData, getPlayers, getSignups, player, signups} from "../firebase/utils";
import {db} from "../firebase/init";

const Wrapper = styled.div`
  padding: 2rem;
`

const PlayersGrid = styled.div`
  display: grid;
  margin: auto;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  
  @media(max-width: 1023px){
    grid-template-columns: 1fr 1fr;
  }

  @media(max-width: 567px){
    grid-template-columns: 1fr;
  }
`

const PlayerTile = styled.div`
  border-radius: 1rem;
  background: rgba(255,255,255,0.69);
  margin: 1rem;
  padding: 1rem;
`

const PlayerName = styled.h3`
  padding: 0.5rem;
  margin: 0;
`

const PlayerCharacters = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`

const PlayerCharacter = styled.div`
  border-radius: 0.5rem;
  background: rgba(231, 218, 218, 0.69);
  margin: 0.5rem 0;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
`

const CharName = styled.div`
  margin: auto;
  padding: 0 0.5rem;
`

const CharClass = styled.div``

const CharIlvl = styled.div``

const Player: React.FC <{player: player}> = ({player}) => {
    return(
        <PlayerTile>
            <PlayerName>{player.name}</PlayerName>
            <PlayerCharacters>
                {player.characters.map(char =>
                    <PlayerCharacter>
                        <CharClass style={{color: getClassData(char.class).color || "white"}}>{char.class}</CharClass>
                        <CharName>{char.name}</CharName>
                        <CharIlvl>{char.ilvl}</CharIlvl>
                    </PlayerCharacter>)}
            </PlayerCharacters>
        </PlayerTile>
    )
}

const Players = () => {
    const [players, setPlayers] = useState<Array<player>>([])
    const [playerId, setPlayerId] = useState<string>("")

    useEffect(() => {
        let id = JSON.parse(localStorage.getItem('playerId') as string)
        if (id) {
            setPlayerId(id);
        }
    }, [playerId]);

    console.log(players)

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