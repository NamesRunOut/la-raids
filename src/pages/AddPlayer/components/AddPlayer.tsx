import React, {useContext, useState} from "react";
import {addPlayer as addPlayerToDB, character_class} from "../../../firebase/utils";
import {db} from "../../../firebase/init";
import styled from "styled-components";
import {classData} from "../../../data/classData";
import {Character, Header, Input} from "./styles";
import {NotificationContext} from "../../../contexts/NotificationContext";
import {Add, Remove, Save} from '../../../styles/common'
import {darktext} from "../../../styles/palette";

const Wrapper = styled.div`
  color: ${darktext};
`

const AddPlayer = () => {
    const [player, setPlayer] = useState<any>({
        name: "",
        characters: []
    })
    const [setNotification] = useContext(NotificationContext)

    const saveChanges = () => {
        let tmp = player
        for (let i=0;i<tmp.characters.length;i++){
            tmp.characters[i] = {
                name: tmp.characters[i].name,
                class: tmp.characters[i].class,
                ilvl: tmp.characters[i].ilvl
            }
        }
        addPlayerToDB(db, tmp, setNotification)
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

    return (
        <Wrapper>
            <Header>Discord name: <Input value={player.name} onChange={e => setPlayer({...player, name: e.target.value})} /></Header>

            <Header>Characters:</Header>
            <Add onClick={addCharacter}>Add character</Add>

            {player.characters.length > 0 && <Character>
                <div style={{width: "150px"}}>Character name</div>
                <div style={{width: "110px"}}>Class</div>
                <div style={{width: "150px"}}>Item level</div>
                <div style={{width: "70px"}}/>
            </Character>}
            {player.characters.map((char: any) =>
                <Character key={char.id}>
                    <input value={char.name} onChange={e => changeName(e, char.id)} />
                    <select value={char.class || character_class[character_class.Berserker]} onChange={(e) => changeClass(e, char.id)}>
                        {Object.keys(classData).map((spec: any) => <option key={`${char.id}-${spec}`} value={spec}>{spec}</option>)}
                    </select>
                    <input type="number" value={char.ilvl} onChange={e => changeIlvl(e, char.id)} />
                    <Remove onClick={() => removeCharacter(char)}>X</Remove>
                </Character>
            )}

            <Save onClick={saveChanges}>Save changes</Save>
        </Wrapper>
    );
}

export default AddPlayer