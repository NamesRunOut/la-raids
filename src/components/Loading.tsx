import * as React from "react";
import {motion, useTime, useTransform} from "framer-motion";
import styled from "styled-components";

const Square = styled.div`
  border: 1rem solid #f3f3f3;
  border-top: 1rem solid #11c2c3;
  border-right: 1rem solid transparent;
  border-bottom: 1rem solid #11c2c3;
  border-left: 1rem solid transparent;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const Loading = () => {

    return (
        <Square></Square>
    );
}

export default Loading