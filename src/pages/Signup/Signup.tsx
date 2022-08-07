import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {raidData} from "../../data/raidData";
import {getPlayers} from "../../firebase/utils";
import {db} from "../../firebase/init";
import {Character, Header, PlayerSelect, Raid, RaidWrapper, Save} from "./styles";
import {collection, doc, Firestore, getDoc, getDocs, query, setDoc} from "firebase/firestore";

const Wrapper = styled.div`
  padding: 1rem;
  color: white;
`

const Navbar = styled.nav`
  padding: 0.25rem 0.25rem 0 0.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
  background: rgba(0, 0, 0, 0.2);
`

const RaidLink = styled.div`
  text-decoration: none;
  color: black;
  width: max-content;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;

  :hover {
    background: rgba(0, 0, 0, 0.2);
  }
`

const getAllRaidSignupData = async (db: Firestore) => {
    const q = query(collection(db, "signups"))
    const querySnapshot = await getDocs(q)
    let result = new Map()
    querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
        // console.log(doc.id, " => ", doc.data());
        result.set(doc.id, doc.data())
    })
    return result
}

const Signup = () => {
    const [signups, setSignups] = useState<any>(new Map())
    const [currentPlayerSignups, setCurrentPlayerSignups] = useState<any>(new Map())
    const [allPlayers, setAllPlayers] = useState<any>([])
    const [player, setPlayer] = useState<any>({name: "", characters: []})

    useEffect(() => {
        // get all players
        getPlayers(db)
            .then(r => {
                let result = []
                for (let [key, value] of r.entries()) {
                    let tmp = value
                    for (let i=0;i<value.characters.length;i++) {
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

        for (let [key, value] of signups.entries()){
            let tmp = []
            // @ts-ignore
            for (let i=0;i<value.players.length;i++) {
                // @ts-ignore
                if (value.players[i].playerName === player.name) { 
                    // @ts-ignore
                    tmp.push(player.characters.find((char: any) => char.name === value.players[i].name) || value.players[i])
                }
            }
            result.set(key, tmp)
        }

        setCurrentPlayerSignups(result)
    }, [player.characters, player.name, signups]);

    const changePlayer = (e: any) => {
        let tmp = player
        let idx = allPlayers.findIndex((p: any) => p.name === e.target.value)
        if (idx !== -1){
            tmp = allPlayers[idx]
            setPlayer({...tmp, origName: allPlayers[idx].name})
            setCurrentPlayerSignups(new Map())
        }
    }

    const signUp = (e: any, raid: string, charName: string) => {
        let val = e.target.checked
        let curr = structuredClone(currentPlayerSignups)
        let tmp = curr.get(raid)

        if (val) {
            if (tmp !== undefined){
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

        for (let char of raid){
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
                tmp = tmp.filter((char:any) => char.playerName !== player.name)

                let signedChars = currentPlayerSignups.get(key)
                if (key === undefined) continue

                for (let char of signedChars){
                    tmp.push(char)
                }

                await setDoc(doc(db, "signups", key), {
                    ...docSnap.data(),
                    players: [...tmp]
                })
            } else {
                console.log("No such raid!", key);
            }
        }

        alert("Changes saved")
    }

    return (<>
    <Wrapper>
        <Header>
            <PlayerSelect value={player.origName} onChange={changePlayer}>
                {allPlayers.map((p: any) => <option key={p.origName} value={p.name}>{p.name}</option>)}
            </PlayerSelect>
        </Header>

        <Header>{player.name}</Header>

        <RaidWrapper>
        {Object.keys(raidData).map((raid: any) => {
            return(<Raid key={raid}>
            <div>{raid} | raidinfo</div>
            <Header>Eligible characters:</Header>

            {player.characters?.map((char: any) => {
                //@ts-ignore
                if (char.ilvl >= raidData[raid].minlvl) return <Character key={char.id}>
                <input type="checkbox" checked={checkIfSignedUp(raid, player.name, char.name)} onChange={(e) => signUp(e, raid, char.name)} /> {/* checked if matches found in signups */}
                <div>{char.name}</div>
                <div>{char.class}</div>
                <div>{char.ilvl}</div>
            </Character>
            else return <></>
            }
                
            )}
            </Raid>)
            })}     
        </RaidWrapper>

        <Save onClick={saveChanges}>Save changes</Save>
    </Wrapper>
    </>);
}

export default Signup