import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar"; // Adjust the path as necessary
import Home from "./Page/Home";
import Auth from "./Page/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./ReducToolKit/TaskSlice";
import { getUserProfile } from "./ReducToolKit/AuthSlice";

function App() {
  const user = true;  
  const dispatch = useDispatch();
  const { task, auth } = useSelector((store) => store);

  useEffect(() => {
     
      dispatch(fetchTasks({}));
      dispatch(getUserProfile(auth.jwt || localStorage.getItem("jwt")));

  }, [auth.jwt]);

  return (
      <div>
          {auth.user ? (
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
