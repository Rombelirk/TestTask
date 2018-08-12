import React from "react"

const Checkbox = props => {

    const onChange = e => {
        e.stopPropagation;
        props.onChange(props.id)
    }

    return (
        <input type="checkbox" checked={props.checked} onChange={onChange} />
    )
}

export default Checkbox