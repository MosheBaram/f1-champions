import React, { useState } from "react";
import "./App.css";
import { AppContext } from "./AppContext";
import AppRouter from "./AppRouter";

// As making 10 requests did not make sense, I have made the request that gives all that data including data that is not relevant,
// since it was a single, small one (33kb), so that works better.

// Since the information never changes, I require the data only one time, and afterwards it is saved in the state.

// driverStandings used by Champions.jsx
// yearlyResult used by Details.jsx

const App = () => {
  const [driverStandings, setDriverStandings] = useState(null);
  const [yearlyResults, setYearlyResults] = useState({});

  return (
    <AppContext.Provider value={{ driverStandings, setDriverStandings, yearlyResults, setYearlyResults }}>
      <div className="App">
        <AppRouter />
      </div>
    </AppContext.Provider>
  );
};

export default App;
