import { Action } from "../actions/types";

export interface IFirebaseState {
  isSignedIn: boolean;
}

const INITIAL_STATE: IFirebaseState = {
  isSignedIn: false,
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case Action.SIGN_IN:
      return { ...state, isSignedIn: action.payload.userSigned };
    case Action.SIGN_OUT:
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
};
