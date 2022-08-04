import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {character, character_class, getPlayers, player, addPlayer as addPlayerToDB} from "../../firebase/utils";
import {db} from "../../firebase/init";
import EditPlayer from "./components/EditPlayer";
import AddPlayer from "./components/AddPlayer";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  padding: 2rem;
  color: white;
`

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};

const Switch = styled.div`
  width: 5rem;
  height: 1.5rem;
  background-color: ${props =>
          // @ts-ignore
          props.turnedon ? "rgba(255,108,108,0.82)" : "rgba(105,165,255,0.78)"};
  display: flex;
  align-items: center;
  justify-content: ${props =>
          // @ts-ignore
          props.turnedon ? "flex-end" : "flex-start"};
  border-radius: 3rem;
  padding: 1rem;
  cursor: pointer;
`

const Handle = styled(motion.div)`
  width: 2.5rem;
  height: 2.5rem;
  background-color: white;
  border-radius: 50%;
`

const ModeSelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const ModeTitle = styled.h1`
    
`

const AddOrEdit = () => {
    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => setIsOn(!isOn);

    return(
        <Wrapper>
            <ModeSelector>
                <Switch
                    //@ts-ignore
                    turnedon={isOn} onClick={toggleSwitch}>
                    <Handle layout transition={spring} />
                </Switch>
                <ModeTitle>{isOn ? "Edit Player" : "Add Player"}</ModeTitle>
            </ModeSelector>

            {isOn ? <EditPlayer /> : <AddPlayer />}
        </Wrapper>
    )
}

export default AddOrEdit