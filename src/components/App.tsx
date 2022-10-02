import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import TripHistory from "./TripHistory";
import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../actions";
import { RootState } from "../reducers";

firebase.initializeApp({
  apiKey: "AIzaSyCsLkpkvAFQUmKGxAiY89xzi2adv2x4vPg",
  authDomain: "demapp-assignment.firebaseapp.com",
});

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isSignedIn } = useSelector<RootState, { isSignedIn: boolean }>(
    (state) => ({
      isSignedIn: state.firebase.isSignedIn,
    })
  );

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      dispatch(signIn(!!user));
    });
  }, [dispatch]);

  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Header />
          {isSignedIn ? (
            <div className="core">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/tripHistory" exact component={TripHistory} />
              </Switch>
            </div>
          ) : (
            <div className="mt-10">
              <h1 className="text-center text-2xl sm:text-3xl mb-24">
                Welcome to MyTrip
              </h1>
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          )}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
