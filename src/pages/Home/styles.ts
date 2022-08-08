import styled from "styled-components";

export const Raid = styled.div`
  color: white;
  background: #2c2c2c;
  padding: 0.5rem;
  border-radius: 0 0.5rem 0.5rem 0.5rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 0.5rem;
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
`

export const PClass = styled.div``

export const Pilvl = styled.div`
`

export const Character = styled.div`
    display: flex;
`

export const Group = styled.div`
  flex: 1 1 min-content;
  background: #151515;
  padding: 0.5rem;
  border-radius: 0.5rem;
`

export const Wrapper = styled.div`
`

export const Navbar = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  background: #000000;
`

export const RaidLink = styled.div`
  text-decoration: none;
  color: white;
  width: max-content;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem 0.25rem 0 0;
  font-weight: bold;

  :hover {
    background: rgba(0, 0, 0, 0.2);
  }
`

export const PageWrapper = styled.div`
  color: white;
  padding: 1rem;
  background: #151515;
`

export const RaidsWrapper = styled.div`
  background: #000000;
  padding: 0.5rem;
  border-radius: 0.5rem;
`

export const Comment = styled.div`
    width: 100%;
`