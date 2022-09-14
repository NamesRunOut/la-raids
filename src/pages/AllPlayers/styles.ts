import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 1rem;
  color: ${({ theme }) => theme.lighttext};

  @media (max-width: 468px) {
    padding: 0.25rem;
  }
`

export const PlayersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 0.25rem;
`

export const PlayerTile = styled.div`
  flex: 1 1 min-content;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.tilegb};
  border: ${({ theme }) => theme.tileborder};
  padding: 0 0.5rem;
  max-width: 28rem;

  @media (max-width: 468px) {
    flex: 100%;
  }
`

export const PlayerName = styled.h3`
  padding: 0.25rem;
  margin-bottom: 0;
  margin-top: 0.5rem;
  
  @media (max-width: 468px) {
    padding: 0;
    max-width: 7rem;
    overflow: hidden;
  }
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

  @media (max-width: 468px) {
    grid-column-gap: 0.25rem;
  }
`

export const CharName = styled.div`
  max-width: 10rem;
  overflow: hidden;
  width: max-content;
  
  @media (max-width: 468px) {
    max-width: 7rem;
    overflow: hidden;
  }
`

export const CharClass = styled.div`
`

export const CharIlvl = styled.div``

export const Lp = styled.div`
  margin-right: 0.5rem;
`