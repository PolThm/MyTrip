import React from "react";
import { ITrip } from "../reducers/tripReducer";
import Moment from "react-moment";

const TripBooked: React.FC<{ trip: ITrip }> = ({ trip }) => {
  return (
    <div className="mt-8 border border-gray-400 rounded shadow-md">
      <p className="pt-3 pb-1 mx-4">
        Booked on <Moment format="YYYY/MM/DD, HH:mm">{trip.date}</Moment>
      </p>
      <div className="flex justify-between items-center py-2 mx-4 border-b border-gray-400">
        <p className="text-green-600">Departure</p>
        <span className="px-2 ml-2 rounded-lg sm:rounded-full bg-green-500 text-white">
          {trip.departure}
        </span>
      </div>
      <div className="flex justify-between items-center py-2 mx-4 border-b border-gray-400">
        <p className="text-green-600">Arrival</p>
        <span className="px-2 ml-2 rounded-lg sm:rounded-full bg-green-500 text-white">
          {trip.arrival}
        </span>
      </div>
      <div className="flex justify-between items-center py-2 mx-4 border-b border-gray-400">
        <p className="text-green-600">Distance</p>
        <span className="px-2 ml-2 rounded-lg sm:rounded-full bg-green-500 text-white">
          {trip.distance}
        </span>
      </div>
      <div className="flex justify-between items-center pt-2 pb-3 mx-4">
        <p className="text-green-600">Price</p>
        <span className="px-2 ml-2 rounded-lg sm:rounded-full bg-green-500 text-white">
          {trip.price} $
        </span>
      </div>
    </div>
  );
};

export default TripBooked;
