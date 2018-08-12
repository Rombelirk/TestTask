import { createStore, combineReducers, applyMiddleware } from "redux";
import { ticketBoardReducer } from "../reducers/ticketBoardReducer";
import reduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
    ticketBoard: ticketBoardReducer
});

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;