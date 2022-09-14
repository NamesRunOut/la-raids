import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 1rem;
  color: ${({ theme }) => theme.lighttext};

  @media (max-width: 468px) {
    padding: 0.25rem;
  }
`

export const Header = styled.div`
  width: min-content;

  @media (max-width: 468px) {
    width: 100%;
  }
`

export const Input = styled.input`

`

export const RaidName = styled.div`
  text-decoration: none;
  color: ${({ theme }) => theme.lighttext};
  width: max-content;
  border-radius: 0.25rem 0.25rem 0 0;
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 0.25rem;

  @media (max-width: 468px) {
    font-size: 1rem;
  }
`

export const Roster = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr 1fr min-content;
  gap: 0.1rem;
  grid-column-gap: 0.25rem;
`

export const Checkbox = styled.input`
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
    gap: 0.25rem;
`

export const Raid = styled.div`
  flex: 1 1 min-content;
  background: ${({ theme }) => theme.tilegb};
  border-radius: 0.5rem;
  padding: 0.5rem;
  max-width: 28rem;
  border: ${({ theme }) => theme.tileborder};
`

export const RaidWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  //background: #2c2c2c;
  //padding: 0.5rem;
  //border-radius: 0 0.5rem 0.5rem 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 468px) {
    gap: 0.25rem;
  }
`