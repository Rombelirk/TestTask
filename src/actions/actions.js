import axios from "axios"
import {
    SET_AVAILABLE_FLIGHTS,
    FLIGHT_SELECTED,
    SET_FILTER,
    ON_AIRCOMPANY_SELECT
} from "../action_types/action_types"


let flights = [{"depcity":"\u041c\u043e\u0441\u043a\u0432\u0430","arrcity":"\u041d\u044c\u044e-\u0419\u043e\u0440\u043a","date_from":"2018-08-01 01:00","date_to":"2018-08-02 10:00","flight_time":"08:00","aircompany":"SU","transfers":0,"price":30000},{"depcity":"\u041c\u043e\u0441\u043a\u0432\u0430","arrcity":"\u041d\u044c\u044e-\u0419\u043e\u0440\u043a","date_from":"2018-08-01 04:00","date_to":"2018-08-02 18:00","flight_time":"09:00","aircompany":"SU","transfers":0,"price":28000},{"depcity":"\u041c\u043e\u0441\u043a\u0432\u0430","arrcity":"\u041d\u044c\u044e-\u0419\u043e\u0440\u043a","date_from":"2018-08-01 05:00","date_to":"2018-08-02 15:00","flight_time":"16:00","aircompany":"SU","transfers":1,"price":17000},{"depcity":"\u041c\u043e\u0441\u043a\u0432\u0430","arrcity":"\u041d\u044c\u044e-\u0419\u043e\u0440\u043a","date_from":"2018-08-01 02:00","date_to":"2018-08-02 05:00","flight_time":"20:00","aircompany":"S7","transfers":2,"price":15000},{"depcity":"\u041c\u043e\u0441\u043a\u0432\u0430","arrcity":"\u041d\u044c\u044e-\u0419\u043e\u0440\u043a","date_from":"2018-08-01 12:00","date_to":"2018-08-02 19:00","flight_time":"18:00","aircompany":"S7","transfers":2,"price":18000},{"depcity":"\u041c\u043e\u0441\u043a\u0432\u0430","arrcity":"\u041d\u044c\u044e-\u0419\u043e\u0440\u043a","date_from":"2018-08-01 11:00","date_to":"2018-08-02 20:00","flight_time":"14:00","aircompany":"S7","transfers":1,"price":45000},{"depcity":"\u041c\u043e\u0441\u043a\u0432\u0430","arrcity":"\u041d\u044c\u044e-\u0419\u043e\u0440\u043a","date_from":"2018-08-01 03:00","date_to":"2018-08-02 21:00","flight_time":"23:00","aircompany":"EY","transfers":3,"price":26000},{"depcity":"\u041c\u043e\u0441\u043a\u0432\u0430","arrcity":"\u041d\u044c\u044e-\u0419\u043e\u0440\u043a","date_from":"2018-08-01 10:00","date_to":"2018-08-02 23:30","flight_time":"27:00","aircompany":"EY","transfers":3,"price":55000},{"depcity":"\u041c\u043e\u0441\u043a\u0432\u0430","arrcity":"\u041d\u044c\u044e-\u0419\u043e\u0440\u043a","date_from":"2018-08-01 04:00","date_to":"2018-08-02 23:00","flight_time":"08:00","aircompany":"EY","transfers":0,"price":17000}]


export const getAvailableFlights = () => {
    return dispatch => {
        flights = flights.map((flight, index) => {
                        return {
                            ...flight,
                            id: index
                        }
                    })

        setTimeout(() => dispatch({type: SET_AVAILABLE_FLIGHTS, flights}), 10)

        // axios.get("https://biletix.ru/tools/rest_test.php").then((res, err) => {
        //     if (err) {
        //         alert(err)
        //     } else {
        //         let flights = res.data;
        //         flights = flights.map((flight, index) => {
        //             return {
        //                 ...flight,
        //                 id: index
        //             }
        //         })
        //
        //         dispatch({type: SET_AVAILABLE_FLIGHTS, flights})
        //     }
        // })
    }
}

export const onFlightSelect = (id) => {
    return {
        type: FLIGHT_SELECTED,
        selectedFlight: id
    }
}

export const changeFilter = (id, values) => {
    return {
        type: SET_FILTER,
        id,
        values
    }
}

export const onAircompanySelect = id => {

    return {
        type: ON_AIRCOMPANY_SELECT,
        aircompany: id
    }
}