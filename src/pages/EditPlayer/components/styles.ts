import styled from "styled-components";
import {tilegb} from "../../../styles/palette";

export const Header = styled.h3`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  //padding: 1rem 0;
`

export const Input = styled.input`
  border: none;
  border-radius: 1rem;
  font-size: 0.85em;
  padding: 0.25rem 0.75rem;
`

export const Character = styled.div`
  display: grid;
  grid-template-columns: max-content min-content min-content min-content;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 0.5rem;
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

  background: ${tilegb};
`