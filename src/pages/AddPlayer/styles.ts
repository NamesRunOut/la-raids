import styled from "styled-components";
import {darktext} from "../../styles/palette";

export const Wrapper = styled.div`
  padding: 1rem;
  color: ${darktext};
`

export const Header = styled.h3`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0;
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