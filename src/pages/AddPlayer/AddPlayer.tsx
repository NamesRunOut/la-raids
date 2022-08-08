import styled from "styled-components";
import React from "react";
import Add from "./components/AddPlayer";
import {lighttext} from "../../styles/palette";

const Wrapper = styled.div`
  padding: 1rem;
  color: ${lighttext};
`

const AddPlayer = () => {
    return(
        <Wrapper>
            <Add />
        </Wrapper>
    )
}

export default AddPlayer