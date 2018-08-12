import React from "react"
import Slider from "./Slider/Slider"
import styled from "styled-components"
import {connect} from "react-redux"
import CheckboxList from "./CheckboxList/CheckboxList"
import {changeFilter, onAircompanySelect} from "../../actions/actions"
import {
    convertPercentToTime,
    convertPercentToCount,
    aircompaniesToCheckboxOptions
} from "../../selectors/flightsSelector"

const Container = styled.div`
    margin-top: 15px;
    flex-direction: column;
    > div {
        margin-top: 5px;
        
    }
`

const Filters = props => {
    const {
        changeFilter,
        departureTimeFilter,
        arrivalTimeFilter,
        flightTimeFilter,
        transfersFilter,
        aircompanies,
        onAircompanySelect,
        aircompaniesFilter
    } = props;
    return (
        <Container>
            <Slider
                title={"Время отправления"}
                key={"departureTimeFilter"}
                id={"departureTimeFilter"}
                stratMin={0}
                startMax={100}
                onIntervalChange={changeFilter}
                minValue={departureTimeFilter.values.min}
                maxValue={departureTimeFilter.values.max}
            />
            <Slider
                title={"Время прибытия"}
                key={"arrivalTimeFilter"}
                id={"arrivalTimeFilter"}
                stratMin={0}
                startMax={100}
                onIntervalChange={changeFilter}
                minValue={arrivalTimeFilter.values.min}
                maxValue={arrivalTimeFilter.values.max}
            />
            <Slider
                title={"Время в пути"}
                key={"flightTimeFilter"}
                id={"flightTimeFilter"}
                onIntervalChange={changeFilter}
                stratMin={0}
                startMax={100}
                minValue={flightTimeFilter.values.min}
                maxValue={flightTimeFilter.values.max}
            />
            <Slider
                title={"Количество пересадок"}
                key={"transfersFilter"}
                id={"transfersFilter"}
                onIntervalChange={changeFilter}
                stratMin={0}
                startMax={100}
                minValue={transfersFilter.values.min}
                maxValue={transfersFilter.values.max}
            />
            <CheckboxList
                title={"Авиакомпании"}
                onChange={onAircompanySelect}
                options={aircompanies}
                selected={aircompaniesFilter}
            />
        </Container>
    )
}

const mapStateToProps = state => {

    return {
        departureTimeFilter: convertPercentToTime(state.ticketBoard.departureTimeFilter),
        arrivalTimeFilter: convertPercentToTime(state.ticketBoard.arrivalTimeFilter),
        flightTimeFilter: convertPercentToTime(state.ticketBoard.flightTimeFilter),
        transfersFilter: convertPercentToCount(state.ticketBoard.transfersFilter),
        aircompanies: aircompaniesToCheckboxOptions(state.ticketBoard.flights),
        aircompaniesFilter: state.ticketBoard.aircompaniesFilter
    }
}

export default connect(mapStateToProps, {changeFilter, onAircompanySelect})(Filters)