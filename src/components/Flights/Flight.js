import React from "react"
import {connect} from "react-redux"
import {onFlightSelect} from "../../actions/actions"
import Styled from "./styled/Styled"
import RadioButton from "./RadioButton"


const Flight = props => {

    const onFlightSelect = (id) => {
        props.onFlightSelect(id)
    }

    const isFlightSelected = () => {
        const {id, selectedFlight} = props;
        return id === selectedFlight
    }

    return (
        <Styled.Flight selected={props.selected}>
            <Styled.Arrcity>
                <RadioButton
                    {...props}
                    onClick={onFlightSelect}
                />
            </Styled.Arrcity>
            <Styled.Arrcity>
                {props.arrcity}
            </Styled.Arrcity>
            <Styled.Depcity>
                {props.depcity}
            </Styled.Depcity>
            <Styled.DateFrom>
                {props.date_from}
            </Styled.DateFrom>
            <Styled.DateTo>
                {props.date_to}
            </Styled.DateTo>
            <Styled.FlightTime>
                {props.flight_time}
            </Styled.FlightTime>
            <Styled.Transfers>
                {props.transfers}
            </Styled.Transfers>
            <Styled.AirCompany>
                {props.aircompany}
            </Styled.AirCompany>
            <Styled.Price>
                {props.price}
            </Styled.Price>
        </Styled.Flight>

    )
}

Flight.defaultProps = {}

const mapStateToProps = state => {
    return {
        selectedFlight: state.ticketBoard.selectedFlight
    }
}

export default connect(mapStateToProps, {onFlightSelect})(Flight)