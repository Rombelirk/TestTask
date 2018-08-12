import React, {Component} from "react"
import { connect } from "react-redux"
import { getAvailableFlights } from "../actions/actions"
import Flights from "./Flights/Flights"
import Filters from "./Filters/Filters"
import MainWrapper from "./styled/MainWrapper"

class TicketBoard extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getAvailableFlights()
    }

    render() {
        return (
            <MainWrapper>
                <Flights/>
                <Filters/>
            </MainWrapper>
        )
    }
}

export default connect(null, {getAvailableFlights})(TicketBoard);