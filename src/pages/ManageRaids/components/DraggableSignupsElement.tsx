import {ColumnHeader, DroppableStylesSignup, GroupName, SignupsColumnHeader} from "./styles";
import React from "react";
import {Droppable} from "react-beautiful-dnd";
import ListItem from "./ListItem";

const DraggableSignupsElement: React.FC<{ prefix: string, elements: any, raid: string }> = ({
                                                                                                prefix,
                                                                                                elements,
                                                                                                raid
                                                                                            }) => {

    const playersSet = new Set(elements.map((el: any) => el.playerName));

    return (
        <DroppableStylesSignup>
            <SignupsColumnHeader>
                <GroupName>{prefix}</GroupName>
                <div>Unique players: {playersSet.size}</div>
                <div>No characters: {elements.length}</div>
            </SignupsColumnHeader>

            <Droppable droppableId={`${prefix}`}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {elements?.map((item: { id: React.Key | null | undefined; }, index: any) => (
                            <ListItem key={item.id} item={item} index={index} raid={raid} unique={true}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DroppableStylesSignup>
    )
}

export default DraggableSignupsElement