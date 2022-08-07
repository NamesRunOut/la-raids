import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {character, character_class, getPlayers, player, addPlayer as addPlayerToDB} from "../../firebase/utils";
import {db} from "../../firebase/init";
import Add from "./components/AddPlayer";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  padding: 1rem;
  color: white;
`

const AddPlayer = () => {
    return(
        <Wrapper>
            <Add />
        </Wrapper>
    )
}

export default AddPlayer