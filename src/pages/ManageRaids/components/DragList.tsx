//@ts-nocheck
import React, {useContext, useEffect, useState} from "react";
import {DragDropContext} from 'react-beautiful-dnd'
import {Action, ActionsBar, DragDropContextContainer, ListGrid, ListsWrapper, Save, Signups} from "./styles";
import {raidData} from "../../../data/raidData";
import {NotificationContext} from "../../../contexts/NotificationContext";
import {Comment} from "../styles";
import {signedupgroupname} from "../../../data/consts";
import DraggableElement from "./DraggableElement";
import DraggableSignupsElement from "./DraggableSignupsElement";
import addGroup from "../utils/addGroup";
import reset from "../utils/reset";
import onSave from "../utils/onSave";
import compareIlvl from "../utils/compareIlvl";
import autoAssign from "../utils/autoAssign";
import onDragEnd from "../utils/onDragEnd";
import autoAssignParallel from "../utils/autoAssignParallel";
import {PlayerContext} from "../../../contexts/PlayerContext";
import clearSingleRaidAndSignup from "../utils/clearSingleRaidAndSignup";

const DragList: React.FC<{ raid: string, data: { comment: string, players: Array<any> } }> = ({raid, data}) => {
    const [elements, setElements] = useState({})
    const [rcomment, setRcomment] = useState("")
    const [setNotification] = useContext(NotificationContext)
    const [trackedPlayer] = useContext(PlayerContext)

    useEffect(() => {
        let tmp = structuredClone(data.players)
        let dataClone = structuredClone(data)
        tmp.sort(compareIlvl).reverse()
        let raidD = {
            [signedupgroupname]: []
        }
        let i = 0

        for (let char of tmp) {
            raidD[signedupgroupname].push({
                ...char,
                id: i.toString()
            })
            i++
        }

        let allPlayers = 0
        for (let [key, value] of Object.entries(dataClone)) {
            if (key === "comment") continue
            allPlayers += value.length
            for (let p of value) {
                p.id = i.toString()
                i++
            }
        }

        for (let gr = 1; gr <= (Math.max(Object.keys(dataClone).length - 2, Math.floor(allPlayers / raidData[raid].groupSize) + 1 || 2)); gr++) {
            raidD[`group${gr}`] = []
            if (dataClone[`group${gr}`] && dataClone[`group${gr}`].length > 0) {
                raidD[`group${gr}`] = [...dataClone[`group${gr}`]]
            }
            if (gr > allPlayers / 4) break
        }

        setElements({...raidD})
        setRcomment(dataClone.comment)
    }, [raid, data]);

    return (
        <DragDropContextContainer>
            <ActionsBar>
                <Save onClick={() => onSave(raid, rcomment, elements, setNotification, trackedPlayer)}>Save</Save>
                <Action onClick={() => autoAssign(raid, elements, setElements)}>Auto assign</Action>
                <Action onClick={() => autoAssignParallel(raid, elements, setElements)}>Auto assign (force 2 parallel
                    groups)</Action>
                <Action onClick={() => addGroup(elements, setElements)}>Add group</Action>
                {/* <Action onClick={addRun}>Divide into simultaneous runs</Action> */}
                <Action onClick={() => reset(elements, setElements)}>Reset</Action>
                {/*<Action onClick={() => clearSingleRaidAndSignup(trackedPlayer, raid, setNotification)}>Clear assignments and sign ups for this raid</Action>*/}
            </ActionsBar>

            <Comment value={rcomment} placeholder="Add raid description / comment / schedule etc"
                     onChange={e => setRcomment(e.target.value)}/>

            <DragDropContext onDragEnd={(result) => onDragEnd(result, elements, setElements)}>
                <ListsWrapper>
                    <ListGrid>
                        {Object.keys(elements).filter(el => el !== signedupgroupname).map((listKey) => (
                            <DraggableElement
                                elements={elements[listKey]}
                                key={listKey}
                                prefix={listKey}

                                allElements={elements}
                                setElements={setElements}
                                raid={raid}
                            />
                        ))}
                    </ListGrid>
                    <Signups>
                        {Object.keys(elements).filter(el => el === signedupgroupname).map((listKey) => (
                            <DraggableSignupsElement
                                elements={elements[listKey]}
                                key={listKey}
                                prefix={listKey}
                                raid={raid}
                            />
                        ))}
                    </Signups>
                </ListsWrapper>
            </DragDropContext>
        </DragDropContextContainer>
    );
}

export default DragList