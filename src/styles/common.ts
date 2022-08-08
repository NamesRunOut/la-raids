import styled from "styled-components";

export const PlayerSelect = styled.select`
  background: #d9e6f4;
  color: black;
  border: none;
  border-radius: 0.5rem;
  padding: 0.25rem;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`

export const Option = styled.option`
  background: #d9e6f4;
  color: black;
`

export const Save = styled.div`
  padding: 0.5rem 1rem;
  background: #6dafff;
  color: black;
  font-weight: bold;
  border-radius: 1rem;
  width: max-content;
  font-size: 1rem;
  //margin-top: 1rem;
  cursor: pointer;

  :hover {
    background: #4168b2;
  }
`

export const Add = styled.div`
  color: #6dafff;
  background: #2c2c2c;
  width: max-content;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;

  :hover {
    color: #4168b2;
  }
`

export const Remove = styled.div`
  color: #ff5858;
  width: max-content;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  cursor: pointer;

  :hover {
    color: #793232;
  }
`