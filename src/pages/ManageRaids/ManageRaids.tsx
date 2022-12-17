import React, {useContext, useEffect, useState} from "react";
import {addLog, raids, signups} from "../../firebase/utils";
import {db} from "../../firebase/init";
import {raidData} from "../../data/raidData";
import {Navbar, RaidLink, RaidWrapper, SectionTitle, Wrapper} from "./styles";
import DragList from "./components/DragList";
import {doc, setDoc} from "firebase/firestore";
import {NotificationContext} from "../../contexts/NotificationContext";
import {Action} from './components/styles'
import {getSignup} from "./utils/getSignup";
import {PlayerContext} from "../../contexts/PlayerContext";
import getRaidForToday from "../Home/utils/getRaidForToday";

const ManageRaids = () => {
    const [signups, setSignups] = useState<any>({comment: "", players: []})//useState<Array<signups>>([])
    const [selected, setSelected] = useState(getRaidForToday())
    const [setNotification] = useContext(NotificationContext)
    const [trackedPlayer] = useContext(PlayerContext)

    useEffect(() => {
        getSignup(db, selected)
            .then(r => setSignups(r))
            .catch(err => console.log(err))
    }, [selected])

    const clearRaidsAndSignups = async () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure you want to clear all raid and signup data?")) {
            for (let key of Object.keys(raidData)) {
                await setDoc(doc(db, "signups", key), {
                    comment: "",
                    players: [],
                })

                await setDoc(doc(db, "raids", key), {
                    comment: "",
                })

                let log = {
                    player: trackedPlayer === "" ? "unknown" : trackedPlayer,
                    text: "Cleared all signups and raid data"
                }
                addLog(db, log)
            }
            setSignups({comment: "", players: []})
            setNotification({color: "lightgreen", message: "Data cleared"})
        }
    }

    return (<Wrapper>
        <SectionTitle style={{marginTop: "0"}}>General settings</SectionTitle>
        <Action onClick={clearRaidsAndSignups}>Clear assignments and sign ups from all raids</Action>

        <SectionTitle>Individual raid settings</SectionTitle>

        <RaidWrapper>
            <Navbar>
                {Object.keys(raidData).map((raid: any) => {
                    return (<RaidLink
                        key={raid}
                        onClick={() => setSelected(raid)}
                        //@ts-ignore
                        style={{color: raidData[raid].color, background: selected === raid ? "black" : "#2c2c2c"}}>
                        {/*@ts-ignore*/}
                        {raidData[raid].name}
                    </RaidLink>)
                })}
            </Navbar>

            <DragList raid={selected} data={signups}/>
        </RaidWrapper>
    </Wrapper>);
}

export default ManageRaids