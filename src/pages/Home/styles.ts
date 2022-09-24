import { motion } from "framer-motion";
import styled from "styled-components";

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

export const Roster = styled(motion.div)`
  display: grid;
  grid-template-columns: min-content 1fr 1fr min-content;
  gap: 0.1rem;
  grid-column-gap: 0.5rem;
`

export const Lp = styled(motion.div)`
  margin-right: 0.5rem;
`

export const PName = styled(motion.div)`
  max-width: 10rem;
  overflow: hidden;
  width: max-content;
  border-radius: 0.25rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  
  @media (max-width: 468px) {
    max-width: 7rem;
    overflow: hidden;
  }
`

export const PclassWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

export const PClassImage = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`

export const PClass = styled.div``

export const Pilvl = styled(motion.div)`
`

export const Character = styled.div`
  display: flex;
`

export const Group = styled.div`
  flex: 1 1 min-content;
  background: ${({ theme }) => theme.tilegb};
  border: ${({ theme }) => theme.tileborder};
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.lighttext};
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
  color: ${({ theme }) => theme.raidlinkbg};
  width: max-content;
  border-radius: 0.25rem;
  font-weight: bold;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
`

export const PageWrapper = styled.div`
  color: ${({ theme }) => theme.darktext};
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
  color: ${({ theme }) => theme.darktext};
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
  background: ${({ theme }) => theme.tilegb};
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
  
  margin-bottom: 0.5rem;

  background: ${({ theme }) => theme.tilegb};
  border: ${({ theme }) => theme.tileborder};
`

export const Copy = styled.span`
  margin-right: 0.25rem;
  color: lightgreen;
  cursor: pointer;
  
  :hover{
    color: darkgreen;
  }
`