import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import ReduxThunk from "redux-thunk";
import CreateUserDetails from "./reducers/CreateUserDetails";
import AttendanceAlertGenerator from "./reducers/AttendanceAlertGenerator";
import AttendanceIDSetter from "./reducers/AttendanceIDSetter";
import CreateLocationState from "./reducers/CreateLocationState";
const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
const enhancer = composeEnhancers(
    applyMiddleware(ReduxThunk)
);
const rootReducer = combineReducers({
    loggedInUser: CreateUserDetails,
    attendanceAlert: AttendanceAlertGenerator,
    attendanceId: AttendanceIDSetter,
    locations: CreateLocationState
});

const store = configureStore({ reducer: rootReducer })
export default store;