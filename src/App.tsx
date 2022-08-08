import React, {useEffect, useState} from 'react';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Players from "./pages/Players";
import styled from "styled-components";
import AddOrEdit from "./pages/AddPlayer/AddPlayer";
import AddPlayer from './pages/AddPlayer/AddPlayer';
import EditPlayer from './pages/EditPlayer/EditPlayer';
import Signup from './pages/Signup/Signup';
import ManageRaids from "./pages/ManageRaids/ManageRaids";
import {Notification as NotificationContext} from "./contexts/NotificationContext";
import Notification from './components/Notification'

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
  color: #fefefe;
  background: #2c2c2c;
  width: max-content;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;

  :hover {
    color: #777777;
  }
`

const App = () => {
  return(
      <NotificationContext>
          <BrowserRouter>
              <Notification />
              <Navbar>
                  <PageLink to={"/"}>Home</PageLink>
                  <PageLink to={"/signup"}>Raid signups</PageLink>
                  <PageLink to={"/players"}>All players</PageLink>
                  <PageLink to={"/addPlayer"}>Add players</PageLink>
                  <PageLink to={"/editPlayer"}>Edit players</PageLink>
                  <PageLink to={"/manageRaids"}>Manage raids</PageLink>
              </Navbar>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="players" element={<Players />} />
                  <Route path="addPlayer" element={<AddPlayer />} />
                  <Route path="editPlayer" element={<EditPlayer />} />
                  <Route path="manageRaids" element={<ManageRaids />} />
                  {/*<Route path="player/:playerId" element={<Player />} />*/}
                  {/*<Route path="new" element={<NewTeamForm />} />*/}
                  {/*<Route index element={<LeagueStandings />} />*/}
              </Routes>
          </BrowserRouter>
      </NotificationContext>
  )
}

export default App;
