import React, { useState } from "react";
import "./App.css";
import { AppContext } from "./AppContext";
import AppRouter from "./AppRouter";

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
