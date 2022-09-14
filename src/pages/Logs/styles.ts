import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 1rem;
`

export const LogsTable = styled.table`
  background: ${({ theme }) => theme.tilegb};
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.lighttext};
  border-collapse: collapse;
  border: 1px solid ${({ theme }) => theme.lighttext};
`

export const Row = styled.tr`
  border: solid;
  border-width: 1px 0;
`

export const Td = styled.td`
  border-left: 1px solid ${({ theme }) => theme.lighttext};
  padding: 0.25rem;
`

export const Header = styled.th`
  border-left: 1px solid ${({ theme }) => theme.lighttext};
`

export const NextPage = styled.div`
  cursor: pointer;
  background: ${({ theme }) => theme.secondarybuttonbg};
  color: ${({ theme }) => theme.primarybutton};
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  width: max-content;
`
