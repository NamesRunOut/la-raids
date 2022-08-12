import React, {useContext, useState} from "react";
import {playerI} from "../../interfaces/playerI";
import {NotificationContext} from "../../contexts/NotificationContext";
import {Character, Header, Input, Wrapper} from "./styles";
import addCharacter from "./utils/addCharacter";
import changeName from "./utils/changeName";
import {character_class} from "../../firebase/utils";
import changeClass from "./utils/changeClass";
import {classData} from "../../data/classData";
import changeIlvl from "./utils/changeIlvl";
import {Add, Remove, Save} from "../../styles/common";
import removeCharacter from "./utils/removeCharacter";
import saveChanges from "./utils/saveChanges";
import {PlayerContext} from "../../contexts/PlayerContext";

const AddPlayer = () => {
    const [setNotification] = useContext(NotificationContext)
    const [player, setPlayer] = useState<playerI>({
        name: "",
        characters: []
    })
    const [trackedPlayer] = useContext(PlayerContext)

    return (
        <Wrapper>
            <Header>Discord name: <Input value={player.name}
                                         onChange={e => setPlayer({...player, name: e.target.value})}/></Header>

            <Header>Characters:</Header>
            <Add onClick={() => addCharacter(player, setPlayer)}>Add character</Add>

            {player.characters.length > 0 && <Character>
                <div style={{width: "150px"}}>Character name</div>
                <div style={{width: "110px"}}>Class</div>
                <div style={{width: "150px"}}>Item level</div>
                <div style={{width: "70px"}}/>
            </Character>}

            {player.characters.map((char: any) =>
                <Character key={char.id}>
                    <input value={char.name} onChange={e => changeName(e, char.id, player, setPlayer)}/>
                    <select value={char.class || character_class[character_class.Berserker]}
                            onChange={(e) => changeClass(e, char.id, player, setPlayer)}>
                        {Object.keys(classData).map((spec: any) => <option key={`${char.id}-${spec}`}
                                                                           value={spec}>{spec}</option>)}
                    </select>
                    <input type="number" value={char.ilvl} onChange={e => changeIlvl(e, char.id, player, setPlayer)}/>
                    <Remove onClick={() => removeCharacter(char, player, setPlayer)}>X</Remove>
                </Character>
            )}

            <Save onClick={() => saveChanges(player, setPlayer, setNotification, trackedPlayer)}>Save changes</Save>
        </Wrapper>
    )
}

export default AddPlayer