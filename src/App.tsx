import React, {useEffect, useState} from 'react';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Players from "./pages/Players";
import styled from "styled-components";
import AddOrEdit from "./pages/AddPlayer/AddOrEditPlayer";

const Navbar = styled.nav`
  padding: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;

  a {
    text-decoration: none;
    color: #58b8ce;
    background: rgba(255, 255, 255, 0.1);
    width: max-content;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    margin-bottom: 1rem;

    :hover {
      color: #327779;
    }
  }
`

const PageLink = styled(Link)`
      
`

const App = () => {
  return(
      <BrowserRouter>
          <Navbar>
              <PageLink to={"/"}>Home</PageLink>
              <PageLink to={"/players"}>All players</PageLink>
              <PageLink to={"/addPlayer"}>Add/Edit players</PageLink>
          </Navbar>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="players" element={<Players />} />
              <Route path="addPlayer" element={<AddOrEdit />} />
            {/*<Route path="player/:playerId" element={<Player />} />*/}
            {/*<Route path="new" element={<NewTeamForm />} />*/}
            {/*<Route index element={<LeagueStandings />} />*/}
          </Routes>
      </BrowserRouter>
  )
}

export default App;
