import React, {useEffect, useState} from 'react';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Players from "./pages/AllPlayers/Players";
import styled from "styled-components";
import AddOrEdit from "./pages/AddPlayer/AddPlayer";
import AddPlayer from './pages/AddPlayer/AddPlayer';
import EditPlayer from './pages/EditPlayer/EditPlayer';
import Signup from './pages/Signup/Signup';
import ManageRaids from "./pages/ManageRaids/ManageRaids";
import {Notification as NotificationContext} from "./contexts/NotificationContext";
import Notification from './components/Notification'
import {lighttext, navbuttonbg, navbuttonhover} from "./styles/palette";
import {raidData} from "./data/raidData";
import {Player as PlayerContext} from "./contexts/PlayerContext";
import Logs from "./pages/Logs/Logs";

const Navbar = styled.nav`
  padding: 0.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
  background: #151515;
`

const PageLink = styled(Link)`
  text-decoration: none;
  color: ${lighttext};
  background: ${navbuttonbg};
  width: max-content;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;

  :hover {
    color: ${navbuttonhover};
  }
`

const App = () => {
    const [selected, setSelected] = useState("")

    const isSelected = (tab: string) => {
        return tab === selected
    }

    useEffect(() => {
        setSelected(window.location.pathname.slice(1))
    }, [])

  return(
      <NotificationContext>
          <PlayerContext>
              <BrowserRouter>
                  <Notification />
                  <Navbar>
                      <PageLink to={"/"} style={{background: isSelected("") ? "#151515" : "#2c2c2c"}} onClick={() => setSelected("")}>Home</PageLink>
                      <PageLink to={"/signup"} style={{background: isSelected("signup") ? "#151515" : "#2c2c2c"}} onClick={() => setSelected("signup")}>Raid signups</PageLink>
                      <PageLink to={"/players"} style={{background: isSelected("players") ? "#151515" : "#2c2c2c"}} onClick={() => setSelected("players")}>All players</PageLink>
                      <PageLink to={"/addPlayer"} style={{background: isSelected("addPlayer") ? "#151515" : "#2c2c2c"}} onClick={() => setSelected("addPlayer")}>Add players</PageLink>
                      <PageLink to={"/editPlayer"} style={{background: isSelected("editPlayer") ? "#151515" : "#2c2c2c"}} onClick={() => setSelected("editPlayer")}>Edit players</PageLink>
                      <PageLink to={"/manageRaids"} style={{background: isSelected("manageRaids") ? "#151515" : "#2c2c2c"}} onClick={() => setSelected("manageRaids")}>Manage raids</PageLink>
                  </Navbar>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="signup" element={<Signup />} />
                      <Route path="players" element={<Players />} />
                      <Route path="addPlayer" element={<AddPlayer />} />
                      <Route path="editPlayer" element={<EditPlayer />} />
                      <Route path="manageRaids" element={<ManageRaids />} />
                      <Route path="logs" element={<Logs />} />
                  </Routes>
              </BrowserRouter>
          </PlayerContext>
      </NotificationContext>
  )
}

export default App;
