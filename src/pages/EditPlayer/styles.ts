import styled from "styled-components";
import {darktext, tilegb} from "../../styles/palette";

export const Wrapper = styled.div`
  color: ${({ theme }) => theme.darktext};
  padding: 1rem;

  @media (max-width: 468px) {
    padding: 0.25rem;
  }
`

export const Header = styled.h3`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  //padding: 1rem 0;
  margin: 0.25rem 0 0.5rem;
`

export const Input = styled.input`
  border: none;
  border-radius: 1rem;
  font-size: 0.85em;
  padding: 0.25rem 0.75rem;
`

export const CharacterTemplate = styled.div`
  display: grid;
  grid-template-columns: max-content min-content min-content min-content;
  gap: 0.25rem;
  flex-wrap: wrap;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;

  @media (max-width: 468px) {
    gap: 0.25rem;
  }
`

export const Character = styled(CharacterTemplate)`
  background: ${({ theme }) => theme.tilegb};
  border: ${({ theme }) => theme.tileborder};
  padding: 0.25rem;
  width: max-content;
  border-radius: 0.5rem;
`

export const PlayerSelect = styled.select`
  font-size: 1rem;
  border: none;
  padding: 0.5rem 0.5rem;
  border-radius: 0.5rem;
`

export const Setting = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem;
  border-radius: 0.5rem;

  background: ${({ theme }) => theme.tilegb};
`

export const CName = styled.input`
  border-radius: 0.25rem;
  border: none;
  max-width: 7rem;
`

export const CClass = styled.select`
  border-radius: 0.25rem;
  border: none;
  width: min-content;
`

export const CIlvl = styled.input`
  border-radius: 0.25rem;
  border: none;
  max-width: 3.5rem;
`