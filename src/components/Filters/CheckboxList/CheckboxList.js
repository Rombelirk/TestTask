import React from "react"
import styled from "styled-components"
import Checkbox from "./Checkbox"

const MainContainer = styled.div`
    flex-direction: column;
    width: 100%;
`

const Title = styled.div`

`

const MainTitle = styled.div`
    width: 100%;
    justify-content: center;
`

const List = styled.div`

`

const CheckboxContainer = styled.label`
    display: flex;
    cursor: pointer;
    margin-right: 10px;
`




    

const CheckboxList = props => {

    const onChange = id => {
        props.onChange(id)
    }

    return (
        <MainContainer>
            <MainTitle>
                {
                    props.title
                }
            </MainTitle>
            <List>
                {
                    props.options.map(option => {
                        return (
                            <CheckboxContainer key={option}>
                                <Checkbox
                                    id={option}
                                    onChange={onChange}
                                    checked={props.selected.includes(option)}/>
                                <Title>{option}</Title>
                            </CheckboxContainer>
                        )
                    })
                }
            </List>

        </MainContainer>
    )
}

CheckboxList.defaultProps = {
    options:[],
    selected: []
}

export default CheckboxList
