import React, {useEffect, useState} from 'react';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Players from "./pages/Players";
import styled from "styled-components";
import AddPlayer from "./pages/AddPlayer";

const Navbar = styled.nav`
  padding: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`

const PageLink = styled(Link)`
      
`

const App = () => {
  return(
      <BrowserRouter>
          <Navbar>
              <PageLink to={"/"}>Home</PageLink>
              <PageLink to={"/players"}>All players</PageLink>
              <PageLink to={"/addPlayer"}>Add player</PageLink>
          </Navbar>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="players" element={<Players />} />
              <Route path="addPlayer" element={<AddPlayer />} />
            {/*<Route path="player/:playerId" element={<Player />} />*/}
            {/*<Route path="new" element={<NewTeamForm />} />*/}
            {/*<Route index element={<LeagueStandings />} />*/}
          </Routes>
      </BrowserRouter>
  )
}

export default App;
