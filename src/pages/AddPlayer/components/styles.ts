import styled from "styled-components";

export const Add = styled.div`
  color: #58ce99;
  background: rgba(255,255,255,0.1);
  width: max-content;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  margin-bottom: 1rem;

  :hover {
    color: #327959;
  }
`

export const Remove = styled.div`
  color: #ce5858;
  width: max-content;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;

  :hover {
    color: #793232;
  }
`

export const Save = styled.div`
  padding: 0.5rem 1rem;
  background: #58ce99;
  color: black;
  font-weight: bold;
  border-radius: 1rem;
  width: max-content;
  font-size: 1rem;
  
  :hover {
    background: #327959;
  }
`

export const Header = styled.h2`
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