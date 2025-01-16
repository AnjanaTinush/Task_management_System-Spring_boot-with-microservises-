import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar"; // Adjust the path as necessary
import Home from "./Page/Home";
import Auth from "./Page/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./ReducToolKit/TaskSlice";
import { getUserProfile } from "./ReducToolKit/AuthSlice";

function App() {
  const dispatch = useDispatch();
  const { task, auth } = useSelector((store) => store);

  useEffect(() => {
      if (auth.jwt || localStorage.getItem("jwt")) {
          dispatch(getUserProfile(auth.jwt || localStorage.getItem("jwt")));
      }
      dispatch(fetchTasks({}));
  }, [auth.jwt, dispatch]);

  return (
      <div>
          {auth.loggedIn && auth.user ? (
              <div>
                  <Navbar />
                  <Home />
              </div>
          ) : (
              <Auth />
          )}
      </div>
  );
}


export default App;
