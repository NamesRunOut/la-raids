//@ts-nocheck
import removeFromList from "./removeFromList";
import addToList from "./addToList";
import {SetStateAction} from "react";
import {DropResult} from "react-beautiful-dnd";

const onDragEnd = (result: DropResult, elements: {}, setElements: { (value: SetStateAction<{}>): void; (arg0: any): void; }) => {
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

export default onDragEnd