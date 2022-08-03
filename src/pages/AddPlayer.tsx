import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {Reorder} from "framer-motion";
import {character, character_class, getClassData, getPlayers, getSignups, player, signups} from "../firebase/utils";
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
    const [player, setPlayer] = useState<player>({
        name: "",
        characters: []
    })

    useEffect(() => {

    }, []);


    useEffect(() => {
        getPlayers(db)
            // @ts-ignore
            .then(r => setPlayers(r))
            .catch(err => console.log(err))
    }, [])

    const addPlayer = () => {

    }

    const addCharacter = () => {
        setPlayer({
            ...player,
            characters: [
                ...player.characters,
                {
                    name: "",
                    class: character_class.Berserker,
                    ilvl: 0
                }
            ]})
    }

    const removeCharacter = (char: character) => {
        let tmp = player.characters
        tmp.splice(player.characters.findIndex(el => el.name == char.name && el.class == char.class && el.ilvl == char.ilvl), 1)
        setPlayer({
            ...player,
            characters: [...tmp]
        })
    }

    return (
        <Wrapper>
            Discord name <input value={player.name} onChange={e => setPlayer({...player, name: e.target.value})} />
            Characters:
            <Add onClick={addCharacter}>Add character</Add>

            {player.characters.map((char: character) =>
                <div>
                    <Remove onClick={() => removeCharacter(char)}>remove</Remove>
                    {char.name}
                    {char.class}
                    {char.ilvl}
                </div>
            )}
        </Wrapper>
    );
}

export default AddPlayer