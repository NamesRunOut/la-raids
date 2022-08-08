import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {character, character_class, getPlayers, player, addPlayer as addPlayerToDB} from "../../firebase/utils";
import {db} from "../../firebase/init";
import Edit from "./components/EditPlayer";
import { motion } from "framer-motion";
import {lighttext} from "../../styles/palette";

const Wrapper = styled.div`
  padding: 1rem;
  color: ${lighttext};
`

const EditPlayer = () => {
    return(
        <Wrapper>
            <Edit />
        </Wrapper>
    )
}

export default EditPlayer