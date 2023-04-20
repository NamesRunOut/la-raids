import React, {useContext, useEffect, useState} from 'react';
import {theme1, theme2, theme3} from '../../styles/themes';
import {Indicator, InnerLink, PageLink, Pages, ThemeDropdown, User, Wrapper } from './styles';
import {PlayerContext} from "../../contexts/PlayerContext";
import { getAuth, setPersistence, signInWithRedirect, inMemoryPersistence, GoogleAuthProvider, signInAnonymously, onAuthStateChanged } from "firebase/auth";

const SignupIcon: React.FC <{stroke: string, fill: string}> = ({stroke, fill}) => <svg xmlns="http://www.w3.org/2000/svg" stroke={stroke} fill={fill} width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
const HomeIcon: React.FC <{stroke: string, fill: string}> = ({stroke, fill}) => <svg xmlns="http://www.w3.org/2000/svg" stroke={stroke} fill={fill} width="24" height="24" viewBox="0 0 24 24"><path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z"/></svg>
const AddPlayerIcon: React.FC <{stroke: string, fill: string}> = ({stroke, fill}) => <svg xmlns="http://www.w3.org/2000/svg" stroke={stroke} fill={fill} width="24" height="24" viewBox="0 0 24 24"><path d="M.002 20h6.001c-.028-6.542 2.995-3.697 2.995-8.901 0-2.009-1.311-3.099-2.998-3.099-2.492 0-4.226 2.383-1.866 6.839.775 1.464-.825 1.812-2.545 2.209-1.49.344-1.589 1.072-1.589 2.333l.002.619zm20.498-7c-1.932 0-3.5 1.567-3.5 3.5s1.568 3.5 3.5 3.5 3.5-1.567 3.5-3.5-1.568-3.5-3.5-3.5zm1.5 4h-1v1h-1v-1h-1v-1h1v-1h1v1h1v1zm-4.814 3h-9.183l-.003-.829c0-1.679.133-2.649 2.118-3.107 2.243-.518 4.458-.981 3.394-2.945-3.156-5.82-.901-9.119 2.488-9.119 4.06 0 4.857 4.119 3.085 7.903-1.972.609-3.419 2.428-3.419 4.597 0 1.38.589 2.619 1.52 3.5z"/></svg>
const ManageRaidsIcon: React.FC <{stroke: string, fill: string}> = ({stroke, fill}) => <svg xmlns="http://www.w3.org/2000/svg" stroke={stroke} fill={fill} width="24" height="24" viewBox="0 0 24 24"><path d="M7 16h10v1h-10v-1zm0-1h10v-1h-10v1zm15-13v22h-20v-22h3c1.229 0 2.18-1.084 3-2h8c.82.916 1.771 2 3 2h3zm-11 1c0 .552.448 1 1 1s1-.448 1-1-.448-1-1-1-1 .448-1 1zm9 1h-4l-2 2h-3.898l-2.102-2h-4v18h16v-18zm-13 9h10v-1h-10v1zm0-2h10v-1h-10v1z"/></svg>
const EditPlayerIcon: React.FC <{stroke: string, fill: string}> = ({stroke, fill}) => <svg xmlns="http://www.w3.org/2000/svg" stroke={stroke} fill={fill} width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.019 10.13c-.282-.293-.268-.751.024-1.035l2.974-2.884c.145-.14.332-.211.517-.211.188 0 .375.073.518.22l-4.033 3.91zm-4.888 7.348c-.062.059-.093.139-.093.218 0 .167.136.304.304.304.076 0 .152-.029.212-.086l.499-.486-.422-.436-.5.486zm4.219-5.617l-1.71 1.657c-.918.891-1.387 1.753-1.819 2.958l.754.779c1.217-.395 2.094-.836 3.013-1.728l1.709-1.658-1.947-2.008zm4.985-5.106l-4.402 4.27 2.218 2.29 4.402-4.269c.323-.314.485-.73.485-1.146 0-1.392-1.687-2.13-2.703-1.145z"/></svg>
const AllPlayersIcon: React.FC <{stroke: string, fill: string}> = ({stroke, fill}) => <svg xmlns="http://www.w3.org/2000/svg" stroke={stroke} fill={fill} width="24" height="24" viewBox="0 0 24 24"><path d="M17.997 18h-11.995l-.002-.623c0-1.259.1-1.986 1.588-2.33 1.684-.389 3.344-.736 2.545-2.209-2.366-4.363-.674-6.838 1.866-6.838 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.811-2.214c-1.29-.298-2.49-.559-1.909-1.657 1.769-3.342.469-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.324 0 3.903 2.268 1.77 2.246 6.676h4.501l.002-.463c0-.946-.074-1.493-1.192-1.751zm-22.806 2.214h4.501c-.021-4.906 2.246-2.772 2.246-6.676 0-1.507-.983-2.324-2.248-2.324-1.869 0-3.169 1.787-1.399 5.129.581 1.099-.619 1.359-1.909 1.657-1.119.258-1.193.805-1.193 1.751l.002.463z"/></svg>

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
        setSelected("/"+window.location.pathname.slice(1))

        const localTheme = window.localStorage.getItem('la-raids-theme');
        localTheme && setTheme(localTheme)
    }, [setSelected, setTheme])

    const selectedStyle = {
        border: `1px solid ${theme1.primarybutton}`,
        color: `${theme1.primarybutton}`,
        width: "8.5rem"
    }

    const links = [
        {
            to: "/",
            name: "Home",
            icon: HomeIcon
        },
        {
            to: "/signup",
            name: "Raid signups",
            icon: SignupIcon
        },
        {
            to: "/players",
            name: "All players",
            icon: AllPlayersIcon
        },
        {
            to: "/addPlayer",
            name: "Add players",
            icon: AddPlayerIcon
        },
        {
            to: "/editPlayer",
            name: "Edit players",
            icon: EditPlayerIcon
        },
        {
            to: "/manageRaids",
            name: "Manage raids",
            icon: ManageRaidsIcon
        },
    ]

    return (
        <Wrapper>
            <Pages>
                {links.map(link => {
                    if (isSelected(link.to)) return(<PageLink key={link.to} to={link.to} style={selectedStyle} onClick={() => setSelected(link.to)}><InnerLink><Indicator>{link.icon({stroke: "", fill: `${theme1.primarybutton}`})}</Indicator><div>{link.name}</div></InnerLink></PageLink>)
                    return(<PageLink key={link.to} to={link.to} onClick={() => setSelected(link.to)}><InnerLink><Indicator>{link.icon({stroke: "", fill: `${theme1.navbuttonhover}`})}</Indicator><div>{link.name}</div></InnerLink></PageLink>)
                })}

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
