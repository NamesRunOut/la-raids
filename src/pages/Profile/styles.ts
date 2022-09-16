import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem;
  
  gap: 1rem;
`

export const LoadWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
`

export const Stats = styled.div``

export const IlvlHistory = styled.div`
  background: white;
`

export const ClassImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: #3f3f3f;
`

export const PlayerName = styled.div`
  color: ${({ theme }) => theme.lighttext};
  font-size: 1.5rem;
`