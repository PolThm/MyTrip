import { combineReducers } from "redux";
import tripReducer from "./tripReducer";
import firebaseReducer from "./firebaseReducer";
import { IState as ITripState } from "./tripReducer";
import { IFirebaseState } from "./firebaseReducer";

const rootReducer = combineReducers({
  trip: tripReducer,
  firebase: firebaseReducer,
});

export type RootState = {
  trip: ITripState;
  firebase: IFirebaseState;
};

export default rootReducer;
