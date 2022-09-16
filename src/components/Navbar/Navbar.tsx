import React, {useContext, useEffect, useState} from 'react';
import {theme1, theme2, theme3} from '../../styles/themes';
import {PageLink, Pages, ThemeDropdown, User, Wrapper } from './styles';
import {PlayerContext} from "../../contexts/PlayerContext";
import { getAuth, setPersistence, signInWithRedirect, inMemoryPersistence, GoogleAuthProvider, signInAnonymously, onAuthStateChanged } from "firebase/auth";

const Navbar:React.FC <{theme: string, setTheme: any, selected: string, setSelected: any}> = ({theme, setTheme, selected, setSelected}) => {
    const [player, setPlayer] = useContext(PlayerContext)

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
    }, [setSelected, setTheme])

    return (
        <Wrapper>
            <Pages>
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
            </Pages>

            <User>
                {player || "Unknown player"}
            </User>
        </Wrapper>
    )
}

export default Navbar;
