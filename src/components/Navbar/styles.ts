import styled from "styled-components";
import {Link} from "react-router-dom";

export const Pages = styled.nav`
  padding: 0.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
`

export const PageLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.lighttext};
  background: ${({ theme }) => theme.navbuttonbg};
  width: max-content;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;

  :hover {
    color: ${({ theme }) => theme.navbuttonhover};
  }
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