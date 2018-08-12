import React from "react"
import {connect} from "react-redux"
import Styled from "./styled/Styled"
import Flight from "./Flight"
import { setSelectedFlight, filterFlights } from "../../selectors/flightsSelector"



const Flights = props => {
    return (
        <Styled.FlightsWrapper>
            <Styled.Header>
                <Styled.Column>

                </Styled.Column>
                <Styled.Column>
                    Место отправления
                </Styled.Column>
                <Styled.Column>
                    Место прибытия
                </Styled.Column>
                <Styled.Column>
                    Время отправления
                </Styled.Column>
                <Styled.Column>
                    Время прибытия
                </Styled.Column>
                <Styled.Column>
                    Время в пути
                </Styled.Column>
                <Styled.Column>
                    Пересадки
                </Styled.Column>
                <Styled.Column>
                    Авиакомпания
                </Styled.Column>
                <Styled.Column>
                    Стоимость
                </Styled.Column>

            </Styled.Header>
            {
                props.flights.map((flight, index) => <Flight key={index} {...flight}/>)
            }
        </Styled.FlightsWrapper>
    )
}

Flights.defaultProps = {
    flights: []
}

const mapStateToProps = state => {
    const {flights, selectedFlight} = state.ticketBoard;
    return {
        flights: filterFlights(setSelectedFlight(flights,selectedFlight), state)
    }
}

export default connect(mapStateToProps)(Flights)