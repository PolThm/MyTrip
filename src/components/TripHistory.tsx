import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import TripBooked from "./TripBooked";
import { ITrip } from "../reducers/tripReducer";

const TripHistory: React.FC = () => {
  const { tripList } = useSelector<RootState, { tripList: ITrip[] }>(
    (state) => ({
      tripList: state.trip.tripList,
    })
  );

  let content;
  if (tripList.length === 0) {
    content = (
      <h2 className="mt-24 text-center text-green-600">
        You haven't booked any trips yet...
      </h2>
    );
  } else {
    content = tripList.map((trip) => {
      return <TripBooked key={trip.id} trip={trip} />;
    });
  }

  return (
    <div className="my-10">
      <h1 className="text-center text-2xl sm:text-3xl">Trip History</h1>
      {content}
    </div>
  );
};

export default TripHistory;
