import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {Reorder} from "framer-motion";
import {getPlayers, getSignups, player, signups} from "../firebase/utils";
import {db} from "../firebase/init";

const Wrapper = styled.div`
  padding: 2rem;
`

function List() {
    const [items, setItems] = useState([0, 1, 2, 3])

    return (
        <Reorder.Group axis="y" values={items} onReorder={setItems}>
            {items.map((item) => (
                <Reorder.Item key={item} value={item}>
                    {item}
                </Reorder.Item>
            ))}
        </Reorder.Group>
    )
}

const Home = () => {
    const [players, setPlayers] = useState<Array<player>>([])
    const [signups, setSignups] = useState<Array<signups>>([])
    const [playerId, setPlayerId] = useState<string>("")

    useEffect(() => {
        let id = JSON.parse(localStorage.getItem('playerId') as string)
        if (id) {
            setPlayerId(id);
        }
    }, [playerId]);

    useEffect(() => {
        getPlayers(db)
            // @ts-ignore
            .then(r => setPlayers(r))
            .catch(err => console.log(err))

        getSignups(db)
            // @ts-ignore
            .then(r => setSignups(r))
            .catch(err => console.log(err))
    }, [])

    const addPlayer = () => {

    }

    return (
        <Wrapper>
            <List/>
        </Wrapper>
    );
}

export default Home