//@ts-nocheck
import {classData} from "../../../data/classData";
import {Character, CharacterBgColor, Class, DragItem, Ilvl, Name, PlayerName, Player, PlayerPreference} from "./styles";
import {raidData} from "../../../data/raidData";
import React from "react";
import hexToRgb from "../utils/hexToRgb";
import {Draggable} from 'react-beautiful-dnd'
import getIlvlRating from "../utils/getIlvlRating";
import preferenceData from "../../../data/preferenceData";

const ListItem = ({item, index, raid, unique}) => {
    let torgb = hexToRgb(classData[item.class]?.color || "#000000")
    let bgcolor = `rgba(${torgb[0]}, ${torgb[1]}, ${torgb[2]}, 0.2)`

    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided, snapshot) => {
                return (
                    <DragItem
                        ref={provided.innerRef}
                        snapshot={snapshot}
                        // style={{
                        //     filter: `brightness(50%) sepia(100) saturate(10) grayscale(0.7) hue-rotate(${classData[item.class].imageHue}deg)`,
                        //     backgroundImage: `url(${classData[item.class].image})`
                        // }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <CharacterBgColor
                            style={{
                                background: unique ? bgcolor : "red",
                                // backgroundImage: `url(${classData[item.class].image})`,
                                // backgroundPosition: 'center',
                                // backgroundSize: '4rem 4rem',
                                // backgroundRepeat: 'no-repeat'
                            }}>
                            <Player>
                                <PlayerName>{item.playerName}</PlayerName>
                                <PlayerPreference>{preferenceData[item.preference || 0].shortName}</PlayerPreference>
                            </Player>
                            <Character>
                                <Name>{item.name}</Name>
                                <Class style={{color: classData[item.class]?.color || "black"}}>{item.class}</Class>
                                <Ilvl style={{
                                    color: getIlvlRating(item.ilvl, raidData[raid]?.minlvl || 0),
                                    filter: "brightness(0.69) grayscale(0.5)"
                                }}>{item.ilvl}</Ilvl>
                            </Character>
                        </CharacterBgColor>
                    </DragItem>
                );
            }}
        </Draggable>
    );
};

export default ListItem