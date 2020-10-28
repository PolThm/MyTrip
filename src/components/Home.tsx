import React, { FormEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeparture,
  setArrival,
  setDistance,
  setPrice,
  setTripList,
} from "../actions";
import { RootState } from "../reducers";
import { IState } from "../reducers/tripReducer";
import ClipLoader from "react-spinners/ClipLoader";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputAutocomplete from "./InputAutocomplete";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { departure, arrival, distance, price, tripList } = useSelector<
    RootState,
    IState
    >((state) => ({
    departure: state.trip.departure,
    arrival: state.trip.arrival,
    distance: state.trip.distance,
    price: state.trip.price,
    tripList: state.trip.tripList,
  }));

  const [resultDisplayed, setResultDisplayed] = useState<boolean>(false);
  const [resultErrorDisplayed, setResultErrorDisplayed] = useState(false);
  const [formErrorDisplayed, setFormErrorDisplayed] = useState<boolean>(false);
  const [fakeCardDisplayed, setFakeCardDisplayed] = useState<boolean>(false)

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!departure || !arrival) {
      setFormErrorDisplayed(true);
    } else {
      setFormErrorDisplayed(false);
      dispatch(setDistance(""));
      setResultErrorDisplayed(false);
      setResultDisplayed(true);
      const matrix = new google.maps.DistanceMatrixService();
      matrix.getDistanceMatrix(
        {
          origins: [departure],
          destinations: [arrival],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response) => {
          if (response.rows[0].elements[0].status !== "OK") {
            setResultDisplayed(false);
            setResultErrorDisplayed(true);
          } else {
            const newDistance = response.rows[0].elements[0].distance.text.replace(
              ",",
              ""
            );
            dispatch(setDistance(newDistance));
            dispatch(setPrice((parseInt(newDistance, 10) * 0.9).toFixed(2)));
          }
        }
      );
    }
  };

  const handleToken = async (token: Token) => {
    if (typeof token !== "undefined") {
      toast('Success! Find your trip in the "Trip history" page', {
        type: "success",
      });
      // To prevent duplicates
      if (
        tripList.some((trip) => trip.id !== Date.now()) ||
        tripList.length === 0
      ) {
        dispatch(
          setTripList({
            id: Date.now(),
            date: new Date(),
            departure: departure,
            arrival: arrival,
            distance: distance,
            price: price,
          })
        );
      }
    } else {
      toast("Sorry, something went wrong", { type: "error" });
    }
  };

  let fakeCard;
  if (!fakeCardDisplayed) {
    fakeCard = (
      <div className="text-center ">
        <p
          className="smiley cursor-pointer"
          onClick={() => setFakeCardDisplayed(true)}
        >
          &#128521;
        </p>
        <p>Click me to get a fake card!</p>
      </div>
    );
  } else {
    fakeCard = (
      <div className="text-center border border-gray-400 p-3 rounded shadow-md">
        <div className="flex justify-between items-center py-2 mx-4 border-b border-gray-400">
          <p className="text-green-600">Number</p>
          <span className="px-2 ml-2 rounded-lg sm:rounded-full bg-green-500 text-white">
          4242 4242 4242 4242
          </span>
        </div>
        <div className="flex justify-between items-center py-2 mx-4 border-b border-gray-400">
          <p className="text-green-600">CVC</p>
          <span className="px-2 ml-2 rounded-lg sm:rounded-full bg-green-500 text-white">
          any 3 digits
          </span>
        </div>
        <div className="flex justify-between items-center py-2 mx-4 mb-4 border-b border-gray-400">
          <p className="text-green-600">Date</p>
          <span className="px-2 ml-2 rounded-lg sm:rounded-full bg-green-500 text-white">
          any future date
          </span>
        </div>
        <span
          className="smiley cursor-pointer"
          onClick={() => setFakeCardDisplayed(false)}
        >
          &#128521;
        </span>
      </div>
    );
  }

  let result;
  if (!distance) {
    result = (
      <div className="text-center pt-24">
        <ClipLoader size={50} color={"#48bb78"} />
      </div>
    );
  } else {
    result = (
      <div className="pt-12 border-t border-green-700">
        <div className="text-2xl bg-gray-100 rounded">
          <div className="flex justify-between items-center py-6 mx-4 border-b border-gray-400">
            <p className="text-green-600">Distance </p>
            <span className="py-1 px-3 rounded-full bg-green-500 text-white">
              {distance}
            </span>
          </div>
          <div className="flex justify-between items-center py-6 mx-4">
            <p className="text-green-600">Price </p>
            <span className="py-1 px-3 rounded-full bg-green-500 text-white">
              {price} $
            </span>
          </div>
        </div>
        <StripeCheckout
          stripeKey="pk_test_51HgaL5IkDGvYpfSoraTsxautpowbuPpSKS66Db3KDqlvQtVOzVLXSJrSp3GC3B3403XNT6wqUpi8loVsXvTFLsgf00pSLnaW0V"
          token={handleToken}
          amount={price * 100}
          name="Trip"
          billingAddress
          shippingAddress
        />
        <div className="my-8">
          {fakeCard}
        </div>
      </div>
    );
  }

  return (
    <div className="my-10">
      <h1 className="text-center text-2xl sm:text-3xl">
        What's your next trip?
      </h1>
      <form className="mt-8 pb-12 text-lg" onSubmit={onSubmit}>
        <InputAutocomplete
          updateInputAddress={(address) => dispatch(setDeparture(address))}
          label="Departure"
          placeholder="New York"
        />
        <InputAutocomplete
          updateInputAddress={(address) => dispatch(setArrival(address))}
          label="Arrival"
          placeholder="Los Angeles"
        />
        <button
          className="mt-10 py-4 px-8 bg-green-500 hover:bg-white text-xl text-white hover:text-green-500 border border-green-500 uppercase rounded tracking-widest w-full outline-none shadow"
          type="submit"
        >
          Calculate
        </button>
        {formErrorDisplayed ? (
          <div className="text-red-500 absolute">
            Please complete all entries
          </div>
        ) : null}
      </form>
      {resultDisplayed ? result : null}
      {resultErrorDisplayed ? (
        <div>Something went wrong, please try again.</div>
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default Home;
