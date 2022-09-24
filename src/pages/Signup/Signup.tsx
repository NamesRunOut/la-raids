import React, {useContext, useEffect, useState} from "react";
import {raidData} from "../../data/raidData";
import {addLog, getPlayers} from "../../firebase/utils";
import {db} from "../../firebase/init";
import {Checkbox, Header, PClass, Pilvl, PName, PreferenceDropdown, Raid, RaidName, RaidWrapper, Roster, Wrapper} from "./styles";
import {collection, doc, Firestore, getDoc, getDocs, query, setDoc} from "firebase/firestore";
import {classData} from "../../data/classData";
import {NotificationContext} from "../../contexts/NotificationContext";
import {Option, PlayerSelect, Save} from "../../styles/common";
import {classfilter} from "../../styles/palette";
import getIlvlRating from "../ManageRaids/utils/getIlvlRating";
import {sortByName} from "../../utils/sortByName";
import {PlayerContext} from "../../contexts/PlayerContext";
import {ThemeDropdown} from "../../components/Navbar/styles";
import getAllRaidSignupData from "./utils/getAllRaidSignupData";
import preferenceData from "../../data/preferenceData";

const Signup = () => {
    const [signups, setSignups] = useState<any>(new Map())
    const [currentPlayerSignups, setCurrentPlayerSignups] = useState<any>(new Map())
    const [allPlayers, setAllPlayers] = useState<any>([])
    const [player, setPlayer] = useState<any>({name: "", characters: []})
    const [raidPreferences, setRaidPreferences] = useState<any>(new Map())

    const [setNotification] = useContext(NotificationContext)
    const [trackedPlayer] = useContext(PlayerContext)

    useEffect(() => {
        // get all players
        getPlayers(db)
            .then(r => {
                r.sort(sortByName)
                let result = []
                for (let [key, value] of r.entries()) {
                    let tmp = value
                    for (let i = 0; i < value.characters.length; i++) {
                        tmp.characters[i].playerName = value.name
                    }
                    result.push(tmp)
                }
                if (result.length > 0) setPlayer({...result[0]})
                setAllPlayers(result)
            })
            .catch(err => console.log(err))

        // get raid signups
        getAllRaidSignupData(db)
            .then(r => setSignups(r))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        // update current signups for the selected player
        let result = new Map()
        let preferences = new Map()

        for (let [key, value] of signups.entries()) {
            let tmp = []
            let pref = 0
            for (let i = 0; i < value.players.length; i++) {
                if (value.players[i].playerName === player.name) {
                    pref = value.players[i].preference
                    tmp.push(player.characters.find((char: any) => char.name === value.players[i].name) || value.players[i])
                }
            }
            result.set(key, tmp)
            preferences.set(key, pref)
        }

        setRaidPreferences(preferences)
        setCurrentPlayerSignups(result)
    }, [player.characters, player.name, signups])

    useEffect(() => {
        if (allPlayers.length < 1 || trackedPlayer === "") return
        let findTrackedPlayer = allPlayers.find((el: { name: any; }) => el.name === trackedPlayer)
        if (findTrackedPlayer !== undefined) setPlayer({...findTrackedPlayer, origName: findTrackedPlayer.name})
        else setPlayer({...allPlayers[0], origName: allPlayers[0].name})
    }, [allPlayers, trackedPlayer])

    const changePlayer = (e: any) => {
        let tmp = player
        let idx = allPlayers.findIndex((p: any) => p.name === e.target.value)
        if (idx !== -1) {
            tmp = allPlayers[idx]
            setPlayer({...tmp, origName: allPlayers[idx].name})
            setCurrentPlayerSignups(new Map())
            setRaidPreferences(new Map())
        }
    }

    const signUp = (e: any, raid: string, charName: string) => {
        let val = e.target.checked
        let curr = structuredClone(currentPlayerSignups)
        let tmp = curr.get(raid)

        if (val) {
            if (tmp !== undefined) {
                let char = player.characters.find((c: any) => c.name === charName)
                tmp.push({...char, playerName: player.name})
                curr.set(raid, [...tmp])
            } else {
                let char = player.characters.find((c: any) => c.name === charName)
                curr.set(raid, [{...char, playerName: player.name}])
            }
        } else {
            if (tmp === undefined) return
            tmp = tmp.filter((c: any) => c.name !== charName)
            curr.set(raid, [...tmp])
        }

        setCurrentPlayerSignups(curr)
    }

    const checkIfSignedUp = (raidName: string, playerName: string, charName: string) => {
        let raid = currentPlayerSignups.get(raidName)
        if (raid === undefined) return false

        for (let char of raid) {
            if (char.name === charName && char.playerName === playerName) return true
        }
        return false
    }

    const saveChanges = async () => {
        for (let [key, value] of currentPlayerSignups.entries()) {
            const raidRef = doc(db, "signups", key);
            const docSnap = await getDoc(raidRef);

            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                let tmp = docSnap.data().players
                tmp = tmp.filter((char: any) => char.playerName !== player.name)

                let signedChars = currentPlayerSignups.get(key)
                let pref = raidPreferences.get(key)
                if (key === undefined) continue

                for (let char of signedChars) {
                    char.preference = pref
                    tmp.push(char)
                }

                await setDoc(doc(db, "signups", key), {
                    ...docSnap.data(),
                    players: [...tmp]
                })
                    .then(() => {
                        setNotification({color: "lightgreen", message: "Changes saved"})
                    })
                    .catch(err => {
                        console.log("Error signing up", err)
                        setNotification({color: "lightcoral", message: "Error signing up"})
                    })
            } else {
                console.log("No such raid!", key);
            }
        }

        let log = {
            player: trackedPlayer === "" ? "unknown" : trackedPlayer,
            text: `Updated signups of a player: ${player.name}`
        }
        addLog(db, log)
    }

    const updateRaidPreferences = (raid: any, val: any) => {
        let prefs = structuredClone(raidPreferences)
        prefs.set(raid, parseInt(val))
        setRaidPreferences(prefs)
    }

    return (<Wrapper>
        <Header>
            <PlayerSelect value={player.origName} onChange={changePlayer}>
                {allPlayers.map((p: any) => <Option key={p.origName} value={p.name}>{p.name}</Option>)}
            </PlayerSelect>
        </Header>

        {/*<Header>{player.name}</Header>*/}

        <RaidWrapper>
            {Object.keys(raidData).map((raid: any) => {
                return (<Raid key={raid}>
                    {/*@ts-ignore*/}
                    <RaidName style={{color: raidData[raid].color || "white"}}>
                        {/*@ts-ignore*/}
                        {raidData[raid].name}</RaidName>

                    <PreferenceDropdown value={raidPreferences.get(raid) || 0} onChange={e => updateRaidPreferences(raid, e.target.value)}>
                        {preferenceData.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </PreferenceDropdown>

                    <div>Eligible characters:</div>

                    <Roster>
                        {player.characters?.map((char: any) => {
                                //@ts-ignore
                                if (char.ilvl >= raidData[raid].minlvl) return <React.Fragment key={char.id}>
                                    <Checkbox type="checkbox" checked={checkIfSignedUp(raid, player.name, char.name)}
                                              onChange={(e) => signUp(e, raid, char.name)}/> {/* checked if matches found in signups */}
                                    <PName>{char.name}</PName>
                                    <PClass style={{
                                        //@ts-ignore
                                        color: classData[char.class].color || "black",
                                        filter: classfilter
                                    }}>{char.class}</PClass>
                                    <Pilvl
                                        //@ts-ignore
                                        style={{color: getIlvlRating(char.ilvl, raidData[raid].minlvl || 0) || "black"}}>{char.ilvl}</Pilvl>
                                </React.Fragment>
                                else return <></>
                            }
                        )}
                    </Roster>
                </Raid>)
            })}
        </RaidWrapper>
        <Save onClick={saveChanges}>Save changes</Save>
    </Wrapper>)
}

export default Signup