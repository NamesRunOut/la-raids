import styled from "styled-components";
import React from "react";
import Edit from "./components/EditPlayer";
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