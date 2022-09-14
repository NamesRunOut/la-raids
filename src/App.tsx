import React, {useEffect, useState} from 'react';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from './styles/globalStyles'
import { theme1, theme2, theme3 } from "./styles/themes"
import { Navbar, PageLink, ThemeDropdown } from './styles/styles'
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

const getThemeData = (theme: string) => {
    switch (theme){
        case "theme1":
            return theme1
        case "theme2":
            return theme2
        case "theme3":
            return theme3
        default:
            return theme1
    }
}

const App = () => {
    const [selected, setSelected] = useState("")
    const [theme, setTheme] = useState('theme1');

    const isSelected = (tab: string) => {
        return tab === selected
    }

    const setLocalTheme = (theme: string) => {
        window.localStorage.setItem('la-raids-theme', theme)
        setTheme(theme)
    }

    useEffect(() => {
        setSelected(window.location.pathname.slice(1))

        const localTheme = window.localStorage.getItem('la-raids-theme');
        localTheme && setTheme(localTheme)
    }, [])

    return (
        <ThemeProvider theme={getThemeData(theme)}>
            <GlobalStyles />
            <NotificationContext>
                <PlayerContext>
                    <BrowserRouter>
                        <Notification/>
                        <Navbar>
                            <PageLink to={"/"} style={{background: isSelected("") ? "#151515" : "#2c2c2c"}}
                                      onClick={() => setSelected("")}>Home</PageLink>
                            <PageLink to={"/signup"} style={{background: isSelected("signup") ? "#151515" : "#2c2c2c"}}
                                      onClick={() => setSelected("signup")}>Raid signups</PageLink>
                            <PageLink to={"/players"} style={{background: isSelected("players") ? "#151515" : "#2c2c2c"}}
                                      onClick={() => setSelected("players")}>All players</PageLink>
                            <PageLink to={"/addPlayer"}
                                      style={{background: isSelected("addPlayer") ? "#151515" : "#2c2c2c"}}
                                      onClick={() => setSelected("addPlayer")}>Add players</PageLink>
                            <PageLink to={"/editPlayer"}
                                      style={{background: isSelected("editPlayer") ? "#151515" : "#2c2c2c"}}
                                      onClick={() => setSelected("editPlayer")}>Edit players</PageLink>
                            <PageLink to={"/manageRaids"}
                                      style={{background: isSelected("manageRaids") ? "#151515" : "#2c2c2c"}}
                                      onClick={() => setSelected("manageRaids")}>Manage raids</PageLink>
                            <ThemeDropdown value={theme} onChange={e => setLocalTheme(e.target.value)}>
                                <option>theme1</option>
                                <option>theme2</option>
                                <option>theme3</option>
                            </ThemeDropdown>
                        </Navbar>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="signup" element={<Signup/>}/>
                            <Route path="players" element={<Players/>}/>
                            <Route path="addPlayer" element={<AddPlayer/>}/>
                            <Route path="editPlayer" element={<EditPlayer/>}/>
                            <Route path="manageRaids" element={<ManageRaids/>}/>
                            <Route path="logs" element={<Logs/>}/>
                        </Routes>
                    </BrowserRouter>
                </PlayerContext>
            </NotificationContext>
        </ThemeProvider>
    )
}

export default App;
