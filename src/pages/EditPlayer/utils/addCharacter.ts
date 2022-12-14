import {character_class} from "../../../firebase/utils";

const addCharacter = (player: any, setPlayer: any) => {
    setPlayer({
        ...player,
        characters: [
            ...player.characters,
            {
                id: player.characters.length === 0 ? 0 : player.characters[player.characters.length - 1].id + 1,
                name: "",
                class: character_class[character_class.Berserker],
                ilvl: 0
            }
        ]
    })
}

export default addCharacter