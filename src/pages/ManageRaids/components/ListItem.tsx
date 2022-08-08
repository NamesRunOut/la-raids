//@ts-nocheck
import {classData} from "../../../data/classData";
import {Character, CharacterBgColor, Class, DragItem, Ilvl, Name, PlayerName} from "./styles";
import {raidData} from "../../../data/raidData";
import React from "react";
import hexToRgb from "./utils/hexToRgb";
import {Droppable, Draggable} from 'react-beautiful-dnd'
import getIlvlRating from "./utils/getIlvlRating";

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

export default ListItem