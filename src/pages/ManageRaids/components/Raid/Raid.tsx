//@ts-nocheck
import styled from "styled-components";
import React, {useContext, useEffect, useState} from "react";
import {Droppable, Draggable} from 'react-beautiful-dnd'
import { DragDropContext } from "react-beautiful-dnd";
import {
  DroppableStylesSignup,
  Action,
  RemoveGroup,
  Signups,
  CharacterBgColor,
  Character,
  Class,
  ColumnHeader,
  DragDropContextContainer,
  DragItem,
  DroppableStyles,
  Ilvl,
  ListGrid,
  Name,
  PlayerName,
  ListsWrapper,
  ActionsBar,
  GroupName,
  BasicCInfo,
    Save
} from "../styles";
import { classData } from "../../../../data/classData";
import { raidData } from "../../../../data/raidData";
import Loading from '../../../../components/Loading'
import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../../../firebase/init";
import {NotificationContext} from "../../../../contexts/NotificationContext";
import {Comment} from "../../styles";
import {Remove} from '../../../../styles/common'

const DraggableElement = ({ prefix, elements, allElements, setElements, raid }) => {
    // console.log(prefix, elements)

    const removeGroup = () => {
      let tmp = allElements
      delete tmp[prefix]
      for (let i=0;i<elements.length;i++){
        tmp[signedupgroupname].push(elements[i])
      }
      
      setElements({...tmp})
    }

    return(
    <DroppableStyles>
        <ColumnHeader>
          <GroupName>{prefix}</GroupName>
          <div>{elements.length}/{raidData[raid].groupSize}</div>
          <Remove onClick={removeGroup}>X</Remove>
        </ColumnHeader>

        <Droppable droppableId={`${prefix}`}>
        {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
            {elements?.map((item, index) => (
                <ListItem key={item.id} item={item} index={index} raid={raid} />
            ))}
            {provided.placeholder}
            </div>
        )}
        </Droppable>
    </DroppableStyles>
    )
}

const DraggableSignupsElement = ({ prefix, elements, raid }) => {
  return(
  <DroppableStylesSignup>
      <ColumnHeader>
        <GroupName>{prefix}</GroupName>
        {elements.length}
      </ColumnHeader>

      <Droppable droppableId={`${prefix}`}>
      {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
          {elements?.map((item, index) => (
              <ListItem key={item.id} item={item} index={index} raid={raid} />
          ))}
          {provided.placeholder}
          </div>
      )}
      </Droppable>
  </DroppableStylesSignup>
  )
}

export const signedupgroupname = "signedup"
// TODO change to automatically detect unique players in subsequent groups instead and divide into runs

const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const DragList = ({raid, data}) => {
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

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setElements(listCopy);
  }

  const addGroup = () => {
    let lastGroupCount = Object.keys(elements).length
    setElements({
      ...elements,
      [`Group${lastGroupCount}`]: []
    })
  }

  const compareIlvl = (a, b) => {
    if (a.ilvl < b.ilvl)
       return -1
    if (a.ilvl > b.ilvl)
       return 1
    return 0
 }

  const autoAssign = (elements, setElements) => {
    reset()
    let signedUp = elements[signedupgroupname]
    let groups = []
    let groupMax = raidData[raid].groupSize
    for (let i=0;i<Object.keys(elements).length-1;i++){
      groups.push([])
    }
    let supportClasses = ["Bard", "Paladin"]

    // sort by ilvl
    signedUp.sort(compareIlvl)

    let dpsPlayers = signedUp.filter(c => !supportClasses.includes(c.class))
    let supportPlayers = signedUp.filter(c => supportClasses.includes(c.class))

    // console.log(signedUp, groups)
    // TODO rownlolegle raidy

    // assign at least groupMax/4 supports
    let supportNumber = groupMax/4
    for (let group=0;group<groups.length;group++){
      let suppsInGroup = 0
      let newSups = supportPlayers
      let sIdx = 0
      let eIdx = newSups.length-1

      while (suppsInGroup < Math.ceil(supportNumber/2)){
        if (supportPlayers.length < 1 || groups[group].length >= groupMax || eIdx < 0) break
        if (!groups[group].some(el => el.playerName === newSups[eIdx].playerName)){
          suppsInGroup++
          groups[group].push(newSups[eIdx])
          let elIdx = supportPlayers.indexOf(newSups[eIdx])
          supportPlayers.splice(elIdx, 1)
        }
        eIdx--
      }
      // TODO recilvl + czihi algo
      // TODO rownoleglosc

      newSups = supportPlayers

      while (suppsInGroup < supportNumber){
        if (supportPlayers.length < 1 || groups[group].length >= groupMax || sIdx > newSups.length-1) break
        if (!groups[group].some(el => el.playerName === newSups[sIdx].playerName)){
          suppsInGroup++
          groups[group].push(newSups[sIdx])
          let elIdx = supportPlayers.indexOf(newSups[sIdx])
          supportPlayers.splice(elIdx, 1)
        }
        sIdx++
      }
    }

    // assign dps to groups
    let dpsNumber = groupMax-supportNumber
    for (let group=0;group<groups.length;group++){
      let dpsInGroup = 0
      let newDps = dpsPlayers
      let sIdx = 0
      let eIdx = newDps.length-1

      while (dpsInGroup < Math.ceil(dpsNumber/2)){
        if (dpsPlayers.length < 1 || groups[group].length >= groupMax || eIdx < 0) break
        if (!groups[group].some(el => el.playerName === newDps[eIdx].playerName)){
          dpsInGroup++
          groups[group].push(newDps[eIdx])
          let elIdx = dpsPlayers.indexOf(newDps[eIdx])
          dpsPlayers.splice(elIdx, 1)
        }
        eIdx--
      }

      newDps = dpsPlayers

      while (dpsInGroup < groupMax){
        if (dpsPlayers.length < 1 || groups[group].length >= groupMax || sIdx > newDps.length-1) break
        if (!groups[group].some(el => el.playerName === newDps[sIdx].playerName)){
          dpsInGroup++
          groups[group].push(newDps[sIdx])
          let elIdx = dpsPlayers.indexOf(newDps[sIdx])
          dpsPlayers.splice(elIdx, 1)
        }  
        sIdx++
      }
    }

    // assign leftovers to groups
    let leftovers = [dpsPlayers, supportPlayers].flat()
    for (let group=0;group<groups.length;group++){
      for (let i=0;i<groupMax;i++){
        // weakest first
        if (leftovers.length < 1 || groups[group].length >= groupMax) break
        if (!groups[group].some(el => el.playerName === leftovers[0].playerName))
          groups[group].push(leftovers.shift())

        // strongest last
        if (leftovers.length < 1 || groups[group].length >= groupMax) break
        if (!groups[group].some(el => el.playerName === leftovers[leftovers.length-1].playerName))
          groups[group].push(leftovers.pop())
      }
    }

    // sort groups by ilvl
    for (let group=0;group<groups.length;group++){
      groups[group].sort(compareIlvl).reverse()
    }

    // sort leftovers by ilvl
    leftovers.sort(compareIlvl).reverse()

    // fit and assign data
    let result = {}
    for (let group=0;group<groups.length;group++){
      result[`Group${group+1}`] = groups[group]
    }
    setElements({[signedupgroupname]: leftovers, ...result})
  }

  const reset = () => {
    let tmp = elements
    for (let key of Object.keys(tmp)){
      if (key !== signedupgroupname) {
        for (let i=0;i<tmp[key].length;i++){
          tmp[signedupgroupname].push(tmp[key][i])
        }
        tmp[key] = []
      }    
    }
      
    setElements({...tmp})
  }

  const onSave = async () => {
    // TODO password protected? 
    // auth?

    const raidRef = doc(db, "raids", raid)
    const docSnap = await getDoc(raidRef)

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      let roster = {
        comment: rcomment
      }

      for (let [key, value] of Object.entries(elements)){
        if (key === signedupgroupname) continue
        roster[key] = value
      }

      await setDoc(doc(db, "raids", raid), {
        ...roster
      })
          .then(r => setNotification({color: "lightgreen", message: "Raid saved"}))
          .catch(err => {
            setNotification({color: "lightred", message: "Error saving raid"})
            console.log(err)
          })

    } else {
      console.log("No such raid!", key);
    }
  }

  return (
    <DragDropContextContainer>
      <ActionsBar>
        <Save onClick={onSave}>Save</Save>
        <Action onClick={() => autoAssign(elements, setElements)}>Auto assign</Action>
        <Action onClick={addGroup}>Add group</Action>
        {/* <Action onClick={addRun}>Divide into simultaneous runs</Action> */}
        <Action onClick={reset}>Reset</Action>
      </ActionsBar>

      <Comment value={rcomment} placeholder="Add raid description / comment" onChange={e => setRcomment(e.target.value)} />

      <DragDropContext onDragEnd={onDragEnd}>
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

const ListItem = ({ item, index, raid }) => {
  let torgb = hexToRgb(classData[item.class]?.color || "#000000")
  let bgcolor = `rgba(${torgb[0]}, ${torgb[1]}, ${torgb[2]}, 0.2)`

    return (
      <Draggable draggableId={item.id} index={index}>
        {(provided, snapshot) => {
          return (
            <DragItem
              ref={provided.innerRef}
              snapshot={snapshot}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <CharacterBgColor style={{background: bgcolor}}>
                <PlayerName>{item.playerName}</PlayerName>
                <Character>
                  <Name>{item.name}</Name>
                  <Class style={{color: classData[item.class]?.color || "black"}}>{item.class}</Class>
                  <Ilvl style={{color: getIlvlRating(item.ilvl, raidData[raid]?.minlvl || 0), filter: "brightness(0.69) grayscale(0.5)"}}>{item.ilvl}</Ilvl>
                </Character>
              </CharacterBgColor> 
            </DragItem>
          );
        }}
      </Draggable>
    );
  };


export const getIlvlRating = (clvl, minlvl) => {
  let relative = clvl-minlvl

  // equal ilvl
  if (relative === 0) return "#dada00"

  // less ilvl
  if (relative < 0 && Math.abs(relative) >= 20) return "#d2200c"
  if (relative < 0 && Math.abs(relative) >= 10) return "#c4770e"

  // more ilvl
  if (relative >= 20) return "#10d269"
  if (relative >= 15) return "#11ce39"
  if (relative >= 10) return "#30dc13"
  if (relative >= 5) return "#5fd90f"
  if (relative >= 2) return "#91da10"
  
  return "#cfdc13"
}

const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

export default DragList