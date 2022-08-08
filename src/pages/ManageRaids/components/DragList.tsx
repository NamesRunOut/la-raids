//@ts-nocheck
import React, {useContext, useEffect, useState} from "react";
import {DragDropContext} from 'react-beautiful-dnd'
import {Action, ActionsBar, DragDropContextContainer, ListGrid, ListsWrapper, Save, Signups} from "./styles";
import {raidData} from "../../../data/raidData";
import {NotificationContext} from "../../../contexts/NotificationContext";
import {Comment} from "../styles";
import {signedupgroupname} from "./utils/consts";
import DraggableElement from "./DraggableElement";
import DraggableSignupsElement from "./DraggableSignupsElement";
import addGroup from "./utils/addGroup";
import reset from "./utils/reset";
import onSave from "./utils/onSave";
import compareIlvl from "./utils/compareIlvl";
import autoAssign from "./utils/autoAssign";
import onDragEnd from "./utils/onDragEnd";
import autoAssignParallel from "./utils/autoAssignParallel";

const DragList: React.FC <{raid: string, data: {comment: string, players: Array<any>}}> = ({raid, data}) => {
  const [elements, setElements] = useState({})
  const [rcomment, setRcomment] = useState("")
  const [setNotification] = useContext(NotificationContext)

  useEffect(() => {
    let tmp = structuredClone(data.players)
    tmp.sort(compareIlvl).reverse()
    let raidD = {
      [signedupgroupname]: []
    }
    let i = 0

    for (let char of tmp){
      raidD[signedupgroupname].push({
        ...char,
        id: i.toString()
      })
      i++
    }

    for (let gr=1;gr<=(Math.floor(tmp.length/raidData[raid].groupSize)+1 || 2);gr++){
      raidD[`group${gr}`] = []
      if (gr > tmp.length) break
    }

    setElements({...raidD})
    setRcomment(data.comment)
  }, [raid, data]);

  return (
    <DragDropContextContainer>
      <ActionsBar>
        <Save onClick={() => onSave(raid, rcomment, elements, setNotification)}>Save</Save>
        <Action onClick={() => autoAssign(raid, elements, setElements)}>Auto assign</Action>
        <Action onClick={() => autoAssignParallel(raid, elements, setElements)}>Auto assign (force parallel groups)</Action>
        <Action onClick={() => addGroup(elements, setElements)}>Add group</Action>
        {/* <Action onClick={addRun}>Divide into simultaneous runs</Action> */}
        <Action onClick={() => reset(elements, setElements)}>Reset</Action>
      </ActionsBar>

      <Comment value={rcomment} placeholder="Add raid description / comment" onChange={e => setRcomment(e.target.value)} />

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