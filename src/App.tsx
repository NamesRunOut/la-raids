import React, {useEffect, useState} from 'react';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from './styles/globalStyles'
import { theme1, theme2, theme3 } from "./styles/themes"
import Home from "./pages/Home/Home";
import Players from "./pages/AllPlayers/Players";
import AddPlayer from "./pages/AddPlayer/AddPlayer";
import EditPlayer from './pages/EditPlayer/EditPlayer';
import Signup from './pages/Signup/Signup';
import ManageRaids from "./pages/ManageRaids/ManageRaids";
import {Notification as NotificationContext} from "./contexts/NotificationContext";
import Notification from './components/Notification'
import {Player as PlayerContext} from "./contexts/PlayerContext";
import Logs from "./pages/Logs/Logs";
import Navbar from './components/Navbar/Navbar';
import getThemeData from "./utils/getThemeData";
import Profile from "./pages/Profile/Profile";

const App = () => {
    const [selected, setSelected] = useState("/")
    const [theme, setTheme] = useState('theme1')

    return (
        <ThemeProvider theme={getThemeData(theme)}>
            <GlobalStyles />
            <NotificationContext>
                <PlayerContext>
                    <BrowserRouter>
                        <Notification/>
                        <Navbar theme={theme} setTheme={setTheme} selected={selected} setSelected={setSelected} />
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="signup" element={<Signup/>}/>
                            <Route path="players" element={<Players/>}/>
                            <Route path="addPlayer" element={<AddPlayer/>}/>
                            <Route path="editPlayer" element={<EditPlayer/>}/>
                            <Route path="manageRaids" element={<ManageRaids/>}/>
                            <Route path="player/:id" element={<Profile/>}/>
                            <Route path="logs" element={<Logs/>}/>
                        </Routes>
                    </BrowserRouter>
                </PlayerContext>
            </NotificationContext>
        </ThemeProvider>
    )
}

export default App;
