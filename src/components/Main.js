import React, {Component} from "react"
import store from "../store/store"
import {Provider} from "react-redux";
import TicketBoard from "./TicketBoard"

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
     
        return (

           <Provider store={store}>
               <TicketBoard/>
           </Provider> 

        )
    }
}

export default Main