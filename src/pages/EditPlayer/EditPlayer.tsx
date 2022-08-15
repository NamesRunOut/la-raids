import {collection, doc, Firestore, getDocs, query, setDoc, where} from "firebase/firestore";
import React, {useContext, useEffect, useState} from "react";
import {NotificationContext} from "../../contexts/NotificationContext";
import {PlayerContext} from "../../contexts/PlayerContext";
import {addLog, character_class, getPlayers, player as playerI} from "../../firebase/utils";
import {db} from "../../firebase/init";
import {sortByName} from "../../utils/sortByName";
import {CClass, Character, CharacterTemplate, CIlvl, CName, Header, Setting, Wrapper} from "./styles";
import {Add, Option, PlayerSelect, Remove, Save} from "../../styles/common";
import {classData} from "../../data/classData";
import toggleTrackedPlayer from "./utils/toggleTrackedPlayer";
import getPlayerId from "./utils/getPlayerId";
import changePlayer from "./utils/changePlayer";
import addCharacter from "./utils/addCharacter";
import changeName from "./utils/changeName";
import changeClass from "./utils/changeClass";
import changeIlvl from "./utils/changeIlvl";
import removeCharacter from "./utils/removeCharacter";
import saveChanges from "./utils/saveChanges";

const EditPlayer = () => {
    const [player, setPlayer] = useState<any>({origName: "", name: "", characters: []})
    const [allPlayers, setAllPlayers] = useState<any>([])
    const [setNotification] = useContext(NotificationContext)
    const [trackedPlayer, updateTrackedPlayer] = useContext(PlayerContext)

    useEffect(() => {
        getPlayers(db)
            .then(r => {
                r.sort(sortByName)
                let result = []
                for (let [key, value] of Object.entries(r)) {
                    let tmp = value
                    for (let i = 0; i < value.characters.length; i++) {
                        tmp.characters[i].id = i
                    }
                    result.push(tmp)
                }
                if (result.length > 0) {
                    setPlayer({...result[0], origName: result[0].name})
                }
                setAllPlayers(result)
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        if (allPlayers.length < 1 || trackedPlayer === "") return
        let findTrackedPlayer = allPlayers.find((el: { name: any; }) => el.name === trackedPlayer)
        if (findTrackedPlayer !== undefined) setPlayer({...findTrackedPlayer, origName: findTrackedPlayer.name})
        else setPlayer({...allPlayers[0], origName: allPlayers[0].name})
    }, [allPlayers, trackedPlayer])

    return (
        <Wrapper>
            <Header>
                <PlayerSelect value={player.origName} onChange={(e) => changePlayer(e, player, allPlayers, setPlayer)}>
                    {allPlayers.map((p: any) => <Option key={p.origName} value={p.name}>{p.name}</Option>)}
                </PlayerSelect>
            </Header>

            {/*<Header>Discord name <Input value={player.name} onChange={e => setPlayer({...player, name: e.target.value})} /></Header>*/}
            <Header>Characters:</Header>
            <Add onClick={() => addCharacter(player, setPlayer)}>Add character</Add>

            {player.characters.length > 0 && <CharacterTemplate>
                <div style={{width: "7.5rem"}}>Character name</div>
                <div style={{width: "6.75rem"}}>Class</div>
                <div style={{width: "5rem"}}>Item level</div>
                <div style={{width: "70px"}}/>
            </CharacterTemplate>}
            {player.characters?.map((char: any) =>
                <Character key={char.id}>
                    <CName value={char.name} onChange={e => changeName(e, char.id, player, setPlayer)}/>
                    <CClass value={char.class || character_class[character_class.Berserker]}
                            onChange={(e) => changeClass(e, char.id, player, setPlayer)}>
                        {Object.keys(classData).map((spec: any) => <option key={char.name + spec} value={spec}>{spec}</option>)}
                    </CClass>
                    <CIlvl type="number" value={char.ilvl} onChange={e => changeIlvl(e, char.id, player, setPlayer)}/>
                    <Remove onClick={() => removeCharacter(char, player, setPlayer)}>X</Remove>
                </Character>
            )}

            <Save onClick={() => saveChanges(player, trackedPlayer, setNotification)}>Save changes</Save>

            <Header>Settings</Header>
            <Setting>
                <input checked={trackedPlayer === player.name} onChange={(e) => toggleTrackedPlayer(e, player.name, updateTrackedPlayer)} type="checkbox"/>
                <div>Is that you? - Next time you open up any related page it will redirect you to your own characters</div>
            </Setting>
        </Wrapper>
    );
}

export default EditPlayer