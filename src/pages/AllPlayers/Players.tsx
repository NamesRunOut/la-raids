import React, {useEffect, useState} from "react";
import {getPlayers} from "../../firebase/utils";
import {db} from "../../firebase/init";
import {PlayersGrid, Wrapper} from "./styles";
import {sortByName} from "../../utils/sortByName";
import Player from "./components/Player";
import {rawPlayerI} from "../../interfaces/rawPlayerI";

const Players = () => {
    const [players, setPlayers] = useState<Array<rawPlayerI>>([])

    useEffect(() => {
        getPlayers(db)
            .then(r => {
                // @ts-ignore
                setPlayers(r.sort(sortByName))
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Wrapper>
            <PlayersGrid>
                {players.map(player => <Player key={player.name} player={player}/>)}
            </PlayersGrid>
        </Wrapper>
    );
}

export default Players