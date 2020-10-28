import { Action } from "./types";
import { ITrip } from "../reducers/tripReducer";

export const setDeparture = (address: string) => {
  return {
    type: Action.SET_DEPARTURE,
    payload: { address },
  };
};

export const setArrival = (address: string) => {
  return {
    type: Action.SET_ARRIVAL,
    payload: { address },
  };
};

export const setDistance = (distance?: string | undefined) => {
  return {
    type: Action.SET_DISTANCE,
    payload: { distance },
  };
};

export const setPrice = (price: string) => {
  return {
    type: Action.SET_PRICE,
    payload: { price },
  };
};

export const setTripList = (trip: ITrip) => {
  return {
    type: Action.ADD_TRIP,
    payload: { trip },
  };
};

export const signIn = (userSigned: boolean) => {
  return {
    type: Action.SIGN_IN,
    payload: { userSigned },
  };
};

export const signOut = () => {
  return { type: Action.SIGN_OUT };
};
