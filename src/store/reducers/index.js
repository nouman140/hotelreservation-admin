// Root Reducer

import { combineReducers } from "redux";
import authUserReducer from "./authUser";
import accomodationsReducer from "./AccomodationsReducers";
import reservationReducer from "./ReservationReducer";
import messageReducer from "./MessagesReducer";

export let rootReducer = combineReducers({
  authUser: authUserReducer,
  accomodation: accomodationsReducer,
  reservation: reservationReducer,
  messages: messageReducer,
});

export default rootReducer;
