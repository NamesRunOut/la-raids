import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 1rem;
  color: white;
`

export const Header = styled.div`
  padding: 0 0 0.25rem 0;
  background: #2c2c2c;
  width: min-content;
  border-radius: 0.5rem 0.5rem 0 0;
`

export const PlayerSelect = styled.select`
  background: transparent;
  border: none;
  color: white;
  border-radius: 0.5rem 0.5rem 0 0;
  padding: 0.25rem;
  font-size: 1rem;
`

export const Option = styled.option`
  color: white;
  background: #2c2c2c;
`

export const Input = styled.input`

`

export const RaidName = styled.div`
  text-decoration: none;
  color: white;
  width: max-content;
  border-radius: 0.25rem 0.25rem 0 0;
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
`

export const Roster = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr 1fr min-content;
  gap: 0.1rem;
  
`

export const Checkbox = styled.input`
    margin-right: 0.5rem;
`

export const PName = styled.div`
`

export const PClass = styled.div``

export const Pilvl = styled.div`
`

export const Character = styled.div`
    display: flex;
    gap: 0.25rem;
`

export const Save = styled.div`
  padding: 0.5rem 1rem;
  background: #a4d6a2;
  color: black;
  font-weight: bold;
  border-radius: 1rem;
  width: max-content;
  font-size: 1rem;
  margin-top: 1rem;

  :hover {
    background: #7b9669;
  }
`

export const Raid = styled.div`
  flex: 1 1 20%;
  background: #151515;
  border-radius: 0.5rem;
  padding: 0.5rem;
`

export const RaidWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  background: #2c2c2c;
  padding: 0.5rem;
  border-radius: 0 0.5rem 0.5rem 0.5rem;

`