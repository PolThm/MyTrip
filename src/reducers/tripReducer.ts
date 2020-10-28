import { Action } from "../actions/types";

export interface ITrip {
  id: number;
  date: Date;
  departure: string;
  arrival: string;
  distance: string;
  price: number;
}

export interface IState {
  departure: string;
  arrival: string;
  distance: string;
  price: number;
  tripList: ITrip[];
}

const INITIAL_STATE: IState = {
  departure: "",
  arrival: "",
  distance: "",
  price: 0,
  tripList: [],
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case Action.SET_DEPARTURE:
      return { ...state, departure: action.payload.address };
    case Action.SET_ARRIVAL:
      return { ...state, arrival: action.payload.address };
    case Action.SET_DISTANCE:
      return { ...state, distance: action.payload.distance };
    case Action.SET_PRICE:
      return { ...state, price: action.payload.price };
    case Action.ADD_TRIP:
      return {
        ...state,
        tripList: [action.payload.trip as ITrip, ...state.tripList],
      };
    default:
      return state;
  }
};
