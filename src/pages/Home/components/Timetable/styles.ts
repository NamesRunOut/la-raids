import styled from "styled-components";

export const Wrapper = styled.div`
  //background: #000000;
  padding: 0.5rem 0.5rem 0.5rem 0;
  border-radius: 0.5rem;
  position: relative;

  @media (max-width: 468px) {
    padding: 0rem;
  }
`

export const SecondaryTitle = styled.h2`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: 468px) {
    margin-bottom: 0.25rem;
    font-size: 1.25rem;
  }
`

export const Table = styled.div`
  display: flex;
  position: relative;
  gap: 0.25rem;
  width: max-content;
  //font-size: 0.75rem;
`

export const Slot = styled.div`
  // background: ${({ theme }) => theme.tilegb};
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 12rem;
`

export const Group = styled.div`
  background: ${({ theme }) => theme.tilegb};
  border-radius: 0.25rem;
  padding: 0.25rem;
`

export const Title = styled.div`
  font-weight: bold;
  margin-bottom: 0.25rem;
`

export const Roster = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-column-gap: 0.25rem;
`

export const Lp = styled.div`

`

export const PName = styled.div`
  max-width: 10rem;
  overflow: hidden;
  width: max-content;
  border-radius: 0.25rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
`

export const TimeIndicator = styled.div`
  position: absolute;
  top: 0;
  width: 3px;
  height: 105%;
  border-radius: 2px;
`

export const Disclaimer = styled.div`
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
`