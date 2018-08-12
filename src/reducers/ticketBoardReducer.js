import {
    SET_AVAILABLE_FLIGHTS,
    FLIGHT_SELECTED,
    SET_FILTER,
    ON_AIRCOMPANY_SELECT
} from "../action_types/action_types"

const initialState = {
    flights: [],
    selectedFlight: undefined,
    departureTimeFilter: {
        constrains: {
            min: 0,
            max: 1439
        },
        values: {
            min: 0,
            max: 100
        }
    },
    arrivalTimeFilter: {
        constrains: {
            min: 0,
            max: 1439
        },
        values: {
            min: 0,
            max: 100
        }
    },
    flightTimeFilter: {
        constrains: {
            min: 400,
            max: 2410
        },
        values: {
            min: 0,
            max: 100
        }
    },
    transfersFilter: {
        constrains: {
            min: 0,
            max: 5
        },
        values: {
            min: 0,
            max: 100
        }
    },
    aircompaniesFilter: []
};

export const ticketBoardReducer = (state = initialState, action) => {
    switch (action.type) {

        case ON_AIRCOMPANY_SELECT:
            {
          
                let newAircompanies = [];
                if (state.aircompaniesFilter.includes(action.aircompany)) {
                    newAircompanies = state.aircompaniesFilter.filter(el => el !== action.aircompany)
                } else {
                    newAircompanies = [...state.aircompaniesFilter, action.aircompany];
                }

                return { ...state,
                    aircompaniesFilter: newAircompanies
                }
            }

        case SET_AVAILABLE_FLIGHTS:
            {
                return { ...state,
                    flights: action.flights
                }
            }

        case FLIGHT_SELECTED:
            {
                return { ...state,
                    selectedFlight: action.selectedFlight
                }
            }

        case SET_FILTER:
            {
                const {
                    id,
                    values
                } = action;
                return { ...state,
                    [id]: {
                        ...state[id],
                        values
                    }
                }
            }


        default:
            return state;
    }
};