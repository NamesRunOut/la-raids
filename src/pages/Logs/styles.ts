import styled from "styled-components";
import {lighttext, primarybutton, secondarybuttonbg, tilegb} from "../../styles/palette";

export const Wrapper = styled.div`
  padding: 1rem;
`

export const LogsTable = styled.table`
  background: ${tilegb};
  border-radius: 0.25rem;
  color: ${lighttext};
  border-collapse: collapse;
  border: 1px solid ${lighttext};
`

export const Row = styled.tr`
  border: solid;
  border-width: 1px 0;
`

export const Td = styled.td`
  border-left: 1px solid ${lighttext};
  padding: 0.25rem;
`

export const Header = styled.th`
  border-left: 1px solid ${lighttext};
`

export const NextPage = styled.div`
  cursor: pointer;
  background: ${secondarybuttonbg};
  color: ${primarybutton};
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  width: max-content;
`
