import styled from "styled-components";
import {lighttext, tilegb} from "../../styles/palette";

export const Wrapper = styled.div`
  padding: 1rem;
  color: ${lighttext};
`

export const PlayersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

export const PlayerTile = styled.div`
  flex: 1 1 min-content;
  border-radius: 0.5rem;
  background: ${tilegb};
  margin: 0.25rem;
  padding: 0 0.5rem;
`

export const PlayerName = styled.h3`
  padding: 0.25rem;
  margin-bottom: 0;
  margin-top: 0.5rem;
`

export const PlayerCharacters = styled.div`
`

export const PlayerCharacter = styled.div`
  border-radius: 0.25rem;
  //background: #151515;
  margin: 0.25rem 0;
  padding: 0.25rem;
  
  display: grid;
  grid-template-columns: min-content 1fr 1fr min-content;
  gap: 0.1rem;
  grid-column-gap: 0.5rem;
`

export const CharName = styled.div`
`

export const CharClass = styled.div`
`

export const CharIlvl = styled.div``

export const Lp = styled.div`
  margin-right: 0.5rem;
`