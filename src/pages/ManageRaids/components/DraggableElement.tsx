//@ts-nocheck
import {ColumnHeader, DroppableStyles, GroupName} from "./styles";
import {raidData} from "../../../data/raidData";
import {Remove} from "../../../styles/common";
import React from "react";
import {Droppable} from "react-beautiful-dnd";
import {signedupgroupname} from "./utils/consts";
import ListItem from "./ListItem";

const DraggableElement:React.FC <{prefix: string, elements: any, allElements: any, setElements: any, raid: string}> = ({ prefix, elements, allElements, setElements, raid }) => {
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
                        {elements?.map((item: { id: React.Key | null | undefined; }, index: any) => (
                            <ListItem key={item.id} item={item} index={index} raid={raid} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DroppableStyles>
    )
}

export default DraggableElement