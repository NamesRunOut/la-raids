import styled from "styled-components";
import {darktext, primarybutton, primarybuttonhover, remove, removehover} from "./palette";

export const PlayerSelect = styled.select`
  background: #d9e6f4;
  color: black;
  border: none;
  border-radius: 0.5rem;
  padding: 0.25rem;
  font-size: 1rem;
  margin-bottom: 0.5rem;

  @media (max-width: 468px) {
    width: 100%;
  }
`

export const Option = styled.option`
  background: #d9e6f4;
  color: black;
`

export const Save = styled.div`
  padding: 0.5rem 1rem;
  background: ${primarybutton};
  color: black;//${darktext};
  font-weight: bold;
  border-radius: 1rem;
  width: max-content;
  font-size: 1rem;
  //margin-top: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  :hover {
    background: ${primarybuttonhover};
  }

  @media (max-width: 468px) {
    margin: auto;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`

export const Add = styled.div`
  color: ${primarybutton};
  background: #2c2c2c;
  width: max-content;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;

  :hover {
    color: ${primarybuttonhover};
  }

  @media (max-width: 468px) {
    margin: auto;
    margin-bottom: 0.5rem;
  }
`

export const Remove = styled.div`
  color: ${remove};
  width: max-content;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  cursor: pointer;

  :hover {
    color: ${removehover};
  }
`