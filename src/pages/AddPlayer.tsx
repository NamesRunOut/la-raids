import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {character, character_class, getPlayers, player, addPlayer as addPlayerToDB} from "../firebase/utils";
import {db} from "../firebase/init";

const Wrapper = styled.div`
  padding: 2rem;
  color: white;
`

const Add = styled.div`
  color: green;
`

const Remove = styled.div`
  color: red;
`

const AddPlayer = () => {
    const [player, setPlayer] = useState<any>({
        name: "",
        characters: []
    })

    useEffect(() => {

    }, []);

    const addPlayer = () => {
        console.log(player.characters)
        let tmp = player
        for (let i=0;i<tmp.characters.length;i++){
            tmp.characters[i] = {
                name: tmp.characters[i].name,
                class: character_class[tmp.characters[i].class],
                ilvl: tmp.characters[i].ilvl
            }
        }
        addPlayerToDB(db, tmp)
    }

    const addCharacter = () => {
        setPlayer({
            ...player,
            characters: [
                ...player.characters,
                {
                    id: player.characters.length === 0 ? 0 : player.characters[player.characters.length-1].id+1,
                    name: "",
                    class: character_class.Berserker,
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
        tmp[idx].class = parseInt(e.target.value)
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
            <div onClick={addPlayer}>Add player</div>
            Discord name <input value={player.name} onChange={e => setPlayer({...player, name: e.target.value})} />
            Characters:
            <Add onClick={addCharacter}>Add character</Add>

            {player.characters.map((char: any) =>
                <div>
                    <Remove onClick={() => removeCharacter(char)}>remove</Remove>
                    <select value={player.characters[player.characters.findIndex((el: { id: number; }) => el.id === char.id)]?.class || character_class.Berserker} onChange={(e) => changeClass(e, char.id)}>
                        {(Object.keys(character_class)).map((spec: any) => <option value={spec}>{character_class[spec]}</option>)}
                    </select>
                    <input value={char.name} onChange={e => changeName(e, char.id)} />
                    <input type="number" value={char.ilvl} onChange={e => changeIlvl(e, char.id)} />
                </div>
            )}
        </Wrapper>
    );
}

export default AddPlayer