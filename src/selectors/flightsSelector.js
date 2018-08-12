export const setSelectedFlight = (flights, selectedFlight) => {
   
    return flights.map(flight => {
        return {
            ...flight,
            selected: Number.isInteger(selectedFlight) && flight.id === selectedFlight ? true : false
        }
    })
}

const getHoursAndMinutesOutFromDate = date => {
    
    const hours = date.getHours()
    const minutes = date.getMinutes()
    return {hours, minutes}

}

const getHoursAndMinutesOutFromString = time => {

    const splited = time.split(":")
    return {hours: +splited[0], minutes: +splited[1]}
}

const filterFlightsByTime = (flights, state, filterName, valueName) => {

    const filter = state.ticketBoard[filterName];

    return flights.filter((flight, index) => {
        let depTimeHoursMinutes;
        const time = new Date(flight[valueName])
        if (time.toString() === "Invalid Date") {
            depTimeHoursMinutes = getHoursAndMinutesOutFromString(flight[valueName]);
        } else {
            depTimeHoursMinutes = getHoursAndMinutesOutFromDate(time);
        }

        const depTimeTotalMinutes = depTimeHoursMinutes.hours * 60 + depTimeHoursMinutes.minutes
        const filterTotalInterval = filter.constrains.max - filter.constrains.min;

        const startIntervalPercent = filterTotalInterval / 100 * filter.values.min + filter.constrains.min;
        const endIntervalPercent = filterTotalInterval / 100 * filter.values.max + filter.constrains.min;

        return (endIntervalPercent >= depTimeTotalMinutes && depTimeTotalMinutes >= startIntervalPercent)
    })
}

const filterFlightsByCount = (flights, state, filterName, valueName) => {
    const filter = state.ticketBoard[filterName];

    return flights.filter((flight, index) => {

        const actualValue = flight[valueName];

        const minValue = convertPercentToCount(filter).values.min;
        const maxValue = convertPercentToCount(filter).values.max;
        

        return (minValue <= actualValue && actualValue <= maxValue)
    })
}

const filterFlightsByInclusion = (flights, state, filterName, valueName) => {

    const filter = state.ticketBoard[filterName];
    if (Array.isArray(filter) && filter.length === 0) {
        return flights;
    }
    return flights.filter((flight, index) => {
        return filter.includes(flight[valueName])
    })

}

export const filterFlights = (flights, state) => {
   
    const filteredByDepartureTime = filterFlightsByTime(flights, state, "departureTimeFilter", "date_from");
    const filteredByArrivalTime = filterFlightsByTime(filteredByDepartureTime, state, "arrivalTimeFilter", "date_to");
    const filteredByFlightTime = filterFlightsByTime(filteredByArrivalTime, state, "flightTimeFilter", "flight_time");
    const filterFlightsByTransfers = filterFlightsByCount(filteredByFlightTime, state, "transfersFilter", "transfers");
    const filterFlightsByAircompanies = filterFlightsByInclusion(filterFlightsByTransfers, state, "aircompaniesFilter", "aircompany");
    return filterFlightsByAircompanies;

}

const addZeroIfLessThanTen = int => {
    if (+int < 10) {
        return "0"+int
    } 
    return int
}

export const convertPercentToTime = (filter) => {

    const totalMinutes = filter.constrains.max - filter.constrains.min;

    const maxValueMinutes = totalMinutes / 100 * filter.values.max + filter.constrains.min
    const minValuesMinutes = (totalMinutes / 100 * filter.values.min) + filter.constrains.min

    let maxValueMinutesAndHours = addZeroIfLessThanTen(Math.floor(maxValueMinutes / 60)) + ":" + addZeroIfLessThanTen(Math.floor(maxValueMinutes % 60))
    let minValueMinutesAndHours = addZeroIfLessThanTen(Math.floor(minValuesMinutes / 60)) + ":" + addZeroIfLessThanTen(Math.floor(minValuesMinutes % 60))

    

    return {...filter, values:{
        min: minValueMinutesAndHours,
        max: maxValueMinutesAndHours
    }}
}

export const convertPercentToCount = filter => {
    const countDispersion = filter.constrains.max - filter.constrains.min; //8

    const maxValueCount = Math.floor(countDispersion / 100 * filter.values.max + filter.constrains.min)
    const minValuesCount = Math.floor(countDispersion / 100 * filter.values.min + filter.constrains.min)


    return {...filter, values:{
        min: minValuesCount,
        max: maxValueCount
    }}
}

export const aircompaniesToCheckboxOptions = flights => {
    const aircompanies = [];

    flights.forEach(flight => {
        if (!aircompanies.includes(flight.aircompany)) {
            aircompanies.push(flight.aircompany)
        }
    });

    return aircompanies;
}