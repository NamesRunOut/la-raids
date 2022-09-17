import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem;
  
  gap: 1rem;
`

export const LoadWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`

export const Ilvl = styled.div`
  flex: 1 1 50vw;
  width: 50vw;
  
  @media(max-width: 1024px){
    width: 75vw;
    flex: 1 1 75vw;
  }

  @media(max-width: 468px){
    width: 85vw;
    flex: 1 1 85vw;
  }
`

export const Characters = styled.div`
  flex: 1 1 min-content;
`

export const IlvlHistory = styled.div`
  background: ${({ theme }) => theme.tilegb};
  padding: 1.5rem 1rem 1rem 0.5rem;
  border-radius: 0.5rem;
`

export const ClassImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: #3f3f3f;
`

export const BigPlayerName = styled.div`
  color: ${({ theme }) => theme.lighttext};
  font-size: 3rem;
`

export const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 0.5rem;
`

export const SecondaryTitle = styled.h2`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.lighttext};

  @media (max-width: 468px) {
    margin-bottom: 0.25rem;
    font-size: 1.25rem;
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
  color: ${({ theme }) => theme.lighttext};
`

export const PClassImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`

export const PlayerCharacter = styled.div`
  //background: #151515;
  display: grid;
  grid-template-columns: min-content min-content 1fr min-content;
  gap: 0.1rem;
  grid-column-gap: 0.5rem;
  
  border-radius: 0.5rem;
  margin: 0.25rem 0;
  padding: 0.5rem;
  background: ${({ theme }) => theme.tilegb};
  
  @media (max-width: 468px) {
    grid-column-gap: 0.25rem;
  }
`

export const CharName = styled.div`
  width: max-content;
`

export const CharClass = styled.div`
`

export const CharIlvl = styled.div``

export const Lp = styled.div`
  margin-right: 0.5rem;
`