import React from "react"
import styled from "styled-components"


const OuterCircle = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    box-shadow: inset 0 0 7px 2px rgba(169, 169, 169, 0.43);
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const InnerCircle = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #86bf86;
`

const RadioButton = props => {

    const {id, selected} = props;

    const onClick = e => {
        e.stopPropagation();
        props.onClick(id, selected)
    }

    return (
        <OuterCircle onClick={onClick}>
          {props.selected && <InnerCircle/>}
        </OuterCircle>
    )
}

RadioButton.defaultProps = {
   id: null,
   selected: false,
   onClick: f => f
}

export default RadioButton