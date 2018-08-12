import React from "react"
import styled from "styled-components"

const StyledHandle = styled.div`
    cursor: pointer;
    position: absolute;
    left: ${props => props.left}px;
    right: ${props => props.right}px;
    height: ${props => props.diameter}px;
    width: ${props => props.diameter}px;
    border-radius: 50%;
    background: radial-gradient(ellipse at center, #8fc400 -1%,#89c900 48%,#8fc400 100%);
    /* background: radial-gradient(ellipse at center, #b4df5b 0%,#b4df5b 100%); */
`

const Handle = props => {

    const onMouseDown = e => {
        props.onMouseDown(e, props.id)
    }

    return (
        <StyledHandle
            // right={props.right}
            diameter={props.diameter}
            left={props.left}
            onMouseDown={onMouseDown}
        />
    )
}



export default Handle