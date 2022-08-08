import styled from "styled-components";
import {darktext, tilegb} from "../../styles/palette";

export const SectionTitle = styled.h3`
  //margin-top: 0;
  color: ${darktext};
`

export const Signups = styled.div`
  color: ${darktext};
`

export const Title = styled.h3`
  margin: 0;
`

export const Player = styled.div`

`

export const PName = styled.div`

`

export const Characters = styled.div`

`

export const Character = styled.div`
  display: flex;
`

export const Wrapper = styled.div`
  padding: 1rem;
`

export const RaidWrapper = styled.div`
  //background: #151515;
`

export const Navbar = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  //background: #151515;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`

export const RaidLink = styled.div`
  text-decoration: none;
  color: white;
  width: max-content;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: bold;
  background: ${tilegb};
  cursor: pointer;
`

export const Comment = styled.input`
  margin-bottom: 0.5rem;
  min-width: 15rem;
`