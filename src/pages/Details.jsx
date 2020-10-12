import React, { useEffect, useContext } from "react";
import { AppContext } from "../AppContext";
import { GetYearlyResults } from "../Api";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";

const Details = ({ match }) => {
  const appContext = useContext(AppContext);
  const { yearlyResults, setYearlyResults } = appContext ?? {};

  const { params } = match ?? {};
  const { year, driverId } = params ?? {};
  const yearData = yearlyResults?.[year];

  useEffect(() => {
    // Load data if it doesn't exist
    if (!yearData) {
      // Using IIFE to have async in useEffect
      (async () => {
        const results = await GetYearlyResults(year);

        // Add data to the yearlyResults object
        setYearlyResults((oldValue) => {
          return { ...oldValue, [year]: results };
        });
      })();
    }
  }, [year, setYearlyResults, yearData]);

  if (!yearData) {
    return <div>Loading data...</div>;
  }

  return (
    <div>
      <div>
        <Link to="/">Back to champions list</Link>
      </div>

      <h1>Formula 1 winners of {year}</h1>

      <Table responsive>
        <thead>
          <tr>
            <th>Driver</th>
            <th>Race</th>
            <th>Date</th>
            <th>Fastest Lap</th>
          </tr>
        </thead>
        {yearData.map((yearlyResult) => {
          console.log("yearlyResult!", yearlyResult);
          const { raceName, date, Results } = yearlyResult;
          const firstItemResults = Results?.[0] ?? {};
          const { Driver, FastestLap } = firstItemResults ?? {};
          const { givenName, familyName, driverId: currentDriverId } = Driver ?? {};
          const { Time } = FastestLap ?? {};
          const { time } = Time ?? {};

          return (
            <tbody>
              <tr key={date} className={driverId === currentDriverId ? "winner" : ""}>
                <th>
                  {givenName} {familyName}
                </th>
                <td>{raceName}</td>
                <td>{date}</td>
                <td>{time}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};

export default Details;
