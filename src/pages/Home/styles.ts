import styled from "styled-components";
import {darktext, lighttext, raidlinkbg, secondarybuttonbg, tilegb} from "../../styles/palette";

export const Raid = styled.div`
  //background: #2c2c2c;
  //padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 468px) {
    gap: 0.25rem;
  }
`

export const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 0.5rem;

  @media (max-width: 468px) {
    margin-bottom: 0.25rem;
    font-size: 1.25rem;
  }
`

export const Roster = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr 1fr min-content;
  gap: 0.1rem;
  grid-column-gap: 0.5rem;
`

export const Lp = styled.div`
  margin-right: 0.5rem;
`

export const PName = styled.div`
  max-width: 10rem;
  overflow: hidden;
  width: max-content;
  
  @media (max-width: 468px) {
    max-width: 7rem;
    overflow: hidden;
  }
`

export const PClass = styled.div``

export const Pilvl = styled.div`
`

export const Character = styled.div`
  display: flex;
`

export const Group = styled.div`
  flex: 1 1 min-content;
  background: ${tilegb};
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: ${lighttext};
  max-width: 28rem;

  @media (max-width: 468px) {
    flex: 100%;
  }
`

export const Wrapper = styled.div`
`

export const Navbar = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  //background: #000000;

  @media (max-width: 468px) {
    gap: 0.25rem;
  }
`

export const RaidLink = styled.div`
  text-decoration: none;
  color: ${raidlinkbg};
  width: max-content;
  border-radius: 0.25rem;
  font-weight: bold;
  cursor: pointer;
`

export const PageWrapper = styled.div`
  color: ${darktext};
  padding: 1rem;
  //background: #151515;

  @media (max-width: 468px) {
    padding: 0.25rem;
  }
`

export const RaidsWrapper = styled.div`
  //background: #000000;
  padding: 0.5rem 0.5rem 0.5rem 0;
  border-radius: 0.5rem;

  @media (max-width: 468px) {
    padding: 0rem;
  }
`

export const Comment = styled.div`
  width: 100%;
  color: ${darktext};
`

export const Calendar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  //align-items: flex-start;
  gap: 0.25rem;

  @media (max-width: 468px) {
    gap: 0.25rem;
  }
`

export const Day = styled.div`
  background: ${tilegb};
  flex: 1 1 min-content;
  border-radius: 0.25rem;
  padding: 0.25rem;
  
  b{
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
  }
`

export const SecondaryTitle = styled.h2`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: 468px) {
    margin-bottom: 0.25rem;
    font-size: 1.25rem;
  }
`

export const Setting = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem;
  border-radius: 0.5rem;

  background: ${tilegb};
`

export const Copy = styled.span`
  margin-right: 0.25rem;
  color: lightgreen;
  cursor: pointer;
  
  :hover{
    color: darkgreen;
  }
`