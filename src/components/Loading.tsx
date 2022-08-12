import * as React from "react";
import {motion, useTime, useTransform} from "framer-motion";
import styled from "styled-components";

const Square = styled.div`
    position: absolute;
    top: 40%;
    left: 40%;

    background: white;
    border-radius: 30px;
    width: 150px;
    height: 150px;
`

const Loading = () => {
    const time = useTime();
    const rotate = useTransform(time, [0, 4000], [0, 360], {clamp: false});

    return (
        <Square>
            <motion.div style={{rotate}}/>
        </Square>
    );
}

export default Loading