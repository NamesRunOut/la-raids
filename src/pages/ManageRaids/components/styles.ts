import styled from "styled-components";
import {
    darktext,
    dragitembg,
    primarybutton,
    primarybuttonhover,
    remove, removehover,
    secondarybuttonbg
} from "../../../styles/palette";

export const DragItem = styled.div`
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: ${dragitembg};
  margin: 0 0 8px 0;
  color: ${darktext};
//   gap: 0.25rem;

  min-width: 16rem;
`;

export const DragDropContextContainer = styled.div`
// padding: 0.1rem;
    // border: 4px solid indianred;
  // border-radius: 6px;
  color: #fefefe;
`;

export const ListsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(max-content, 25%);
  gap: 0.25rem;
`

export const Signups = styled.div`
  max-height: 1rem;
  overflow: visible;
`

export const ListGrid = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  // align-items: flex-start;
  // display: grid;
  // grid-template-columns: 1fr 1fr 1fr;
  // grid-gap: 8px;
`;

export const ColumnHeader = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

export const DroppableStyles = styled.div`
  flex: 1 1 17rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: #2c2c2c;
  height: min-content;
  min-width: 17rem;
  max-width: 40%;
`;

export const DroppableStylesSignup = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: #2c2c2c;
  height: min-content;
  min-width: 15rem;
`;

export const PlayerName = styled.div`
  font-size: 0.75rem
`

export const Character = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  gap: 0.5rem;
`

export const BasicCInfo = styled.div`
  display: flex;
`

export const Class = styled.div`
  margin: auto;
`

export const Ilvl = styled.div`

`

export const Name = styled.div`
    
`

export const CharacterBgColor = styled.div`
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
`

export const ActionsBar = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-bottom: 0.25rem;
`

export const Action = styled.div`
  color: ${primarybutton};
  background: ${secondarybuttonbg};
  cursor: pointer;
  width: max-content;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover{
    color: ${primarybuttonhover};
  }
`

export const Save = styled.div`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background: ${primarybutton};
  color: black;
  font-weight: bold;
  width: max-content;
  font-size: 1rem;
  cursor: pointer;

  :hover {
    background: ${primarybuttonhover};
  }
`

export const GroupName = styled.div`
  text-transform: uppercase;
`

export const RemoveGroup = styled.div`
  color: ${remove};
  cursor: pointer;

  :hover{
    color: ${removehover};
  }
`