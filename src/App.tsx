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

const Navbar = styled.nav`
  padding: 0.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
  background: rgba(0,0,0,0.1);
`

const PageLink = styled(Link)`
  text-decoration: none;
  color: black;
  background: rgba(255, 255, 255, 0.2);
  width: max-content;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;

  :hover {
    color: #327779;
  }
`

const App = () => {
  return(
      <BrowserRouter>
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
  )
}

export default App;
