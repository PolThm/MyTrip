import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";

const Header: React.FC = () => {
  return (
    <header className="py-4 flex justify-between">
      <h2 className="mt-3 text-2xl text-green-600">
        Demapp Assignement
        <span className="block text-2xl text-gray-700">by Pol Thomas</span>
      </h2>
      <nav>
        <ul className="sm:flex text-lg md:text-xl pt-4 pl-4">
          <li className="text-green-500 hover:text-green-800">
            <Link to="/">Home</Link>
          </li>
          <li className="sm:ml-10 text-green-500 hover:text-green-800">
            <Link to="/tripHistory">Trip history</Link>
          </li>
          <li
            className="sm:ml-10 text-green-500 hover:text-green-800 cursor-pointer"
            onClick={() => firebase.auth().signOut()}
          >
            Logout
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
