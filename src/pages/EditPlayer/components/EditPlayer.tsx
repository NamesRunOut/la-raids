import React, {useContext, useEffect, useState} from "react";
import {addPlayer as addPlayerToDB, character_class, getPlayers} from "../../../firebase/utils";
import {db} from "../../../firebase/init";
import styled from "styled-components";
import {player as playerI} from "../../../firebase/utils";
import {collection, doc, Firestore, getDoc, getDocs, query, setDoc, where} from "firebase/firestore";
import {classData} from "../../../data/classData";
import { Character, Header, Input} from "./styles";
import {NotificationContext} from "../../../contexts/NotificationContext";
import {PlayerSelect, Option, Save, Add, Remove} from '../../../styles/common'

const Wrapper = styled.div`
  color: black;
`

const getPlayerId = async (db: Firestore, playerName: string) => {
    const q = query(collection(db, "players"), where("name", "==", playerName))
    const querySnapshot = await getDocs(q)
    let result = ""
    querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
        // console.log(doc.id, " => ", doc.data());
        result = doc.id
    })
    return result
}

const EditPlayer = () => {
    const [player, setPlayer] = useState<any>({origName: "", name: "", characters: []})
    const [allPlayers, setAllPlayers] = useState<any>([])
    const [setNotification] = useContext(NotificationContext)

    useEffect(() => {
        getPlayers(db)
            .then(r => {
                let result = []
                for (let [key, value] of Object.entries(r)) {
                    let tmp = value
                    for (let i=0;i<value.characters.length;i++) {
                        tmp.characters[i].id = i
                    }
                    result.push(tmp)
                }
                if (result.length > 0) setPlayer({...result[0], origName: result[0].name})
                setAllPlayers(result)
            })
            .catch(err => console.log(err))
    }, []);

    const saveChanges = () => {
        getPlayerId(db, player.origName)
            .then(pid => {
                let tmp: playerI
                tmp = {
                    name: player.name,
                    characters: []
                }

                for (let i=0;i<player.characters.length;i++){
                    tmp.characters.push({
                        class: player.characters[i].class,
                        ilvl: player.characters[i].ilvl,
                        name: player.characters[i].name
                    })
                }

                const playersRef = collection(db, "players");
                setDoc(doc(playersRef, pid), tmp)
                    .then(r => setNotification({color: "lightgreen", message: "Changes saved"}))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const addCharacter = () => {
        setPlayer({
            ...player,
            characters: [
                ...player.characters,
                {
                    id: player.characters.length === 0 ? 0 : player.characters[player.characters.length-1].id+1,
                    name: "",
                    class: character_class[character_class.Berserker],
                    ilvl: 0
                }
            ]})
    }
    
    const removeCharacter = (char: any) => {
        let tmp = player.characters
        tmp.splice(tmp.findIndex((el: { id: number; }) => el.id === char.id), 1)
        // tmp.splice(player.characters.findIndex((el: any) => el.name == char.name && el.class == char.class && el.ilvl == char.ilvl), 1)
        setPlayer({
            ...player,
            characters: [...tmp]
        })
    }

    const changeClass = (e: any, i: number) => {
        let tmp = player.characters
        let idx = tmp.findIndex((el: { id: number; }) => el.id === i)
        tmp[idx].class = e.target.value
        setPlayer({...player, characters: [...tmp]})
    }

    const changeIlvl = (e: any, i: number) => {
        let tmp = player.characters
        let idx = tmp.findIndex((el: { id: number; }) => el.id === i)
        tmp[idx].ilvl = parseInt(e.target.value)
        setPlayer({...player, characters: [...tmp]})
    }

    const changeName = (e: any, i: number) => {
        let tmp = player.characters
        let idx = tmp.findIndex((el: { id: number; }) => el.id === i)
        tmp[idx].name = e.target.value
        setPlayer({...player, characters: [...tmp]})
    }

    const changePlayer = (e: any) => {
        let tmp = player
        let idx = allPlayers.findIndex((p: any) => p.name === e.target.value)
        if (idx !== -1){
            tmp = allPlayers[idx]
            setPlayer({...tmp, origName: allPlayers[idx].name})
        }
    }

    return (
        <Wrapper>
            <Header>
                <PlayerSelect value={player.origName} onChange={changePlayer}>
                    {allPlayers.map((p: any) => <Option key={p.origName} value={p.name}>{p.name}</Option>)}
                </PlayerSelect>
            </Header>

            {/*<Header>Discord name <Input value={player.name} onChange={e => setPlayer({...player, name: e.target.value})} /></Header>*/}
            <Header>Characters:</Header>
            <Add onClick={addCharacter}>Add character</Add>

            {player.characters.length > 0 && <Character>
                <div style={{width: "110px"}}/>
                <div style={{width: "150px"}}>Character name</div>
                <div style={{width: "150px"}}>Item level</div>
                <div style={{width: "70px"}}/>
            </Character>}
            {player.characters?.map((char: any) =>
                <Character key={char.id}>
                    <select value={char.class || character_class[character_class.Berserker]} onChange={(e) => changeClass(e, char.id)}>
                        {Object.keys(classData).map((spec: any) => <option key={char.name+spec} value={spec}>{spec}</option>)}
                    </select>
                    <input value={char.name} onChange={e => changeName(e, char.id)} />
                    <input type="number" value={char.ilvl} onChange={e => changeIlvl(e, char.id)} />
                    <Remove onClick={() => removeCharacter(char)}>X</Remove>
                </Character>
            )}

            <Save onClick={saveChanges}>Save changes</Save>
        </Wrapper>
    );
}

export default EditPlayer