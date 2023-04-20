import styled from "styled-components";
import {Link} from "react-router-dom";

const base_icon_width = "1rem"

export const Pages = styled.nav`
  padding: 0.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.5s;
`

export const PageLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.navbuttonhover};
  background: transparent;//${({ theme }) => theme.navbuttonbg};
  padding: 0.25rem 0.65rem;
  border-radius: 2rem;
  transition: all 0.5s;
  border: 1px solid ${({ theme }) => theme.navbuttonhover};
  overflow: hidden;
  width: 1.3rem;

  :hover {
    color: ${({ theme }) => theme.lighttext};
    border: 1px solid ${({ theme }) => theme.lighttext};
  }
`

export const InnerLink = styled.div`
  width: max-content;
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: nowrap;
  position: relative;
`

export const Indicator = styled.div`
  width: 1.3rem;
  height: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ThemeDropdown = styled.select`
  background: #151515;
  border: none;
  color: #2c2c2c;
`

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.25rem;

  background: #151515;
`

export const User = styled.div`
  color: ${({ theme }) => theme.lighttext};
  margin-right: 0.5rem;
`