import React, { useEffect, useContext } from "react";
import { AppContext } from "../AppContext";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";
import { GetDriverStandings } from "../Api";

const Champions = () => {
  const appContext = useContext(AppContext);
  const { driverStandings, setDriverStandings } = appContext ?? {};

  const history = useHistory();

  useEffect(() => {
    // Using IIFE to have async in useEffect
    (async () => {
      const results = await GetDriverStandings();
      setDriverStandings(results);
    })();
  }, [setDriverStandings]);

  if (!driverStandings) {
    return <div>Loading data...</div>;
  }

  return (
    <div>
      Champions!
      <Table responsive>
        <thead>
          <tr>
            <th>Year</th>
            <th>Name</th>
            <th>Date Of Birth</th>
            <th>Nationality</th>
            <th>Wins</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {driverStandings?.keys &&
            driverStandings.keys.map((year) => {
              const yearData = driverStandings?.items?.[year];
              const { Driver, points, wins } = yearData ?? {};
              const { givenName, familyName, dateOfBirth, nationality, driverId } = Driver ?? {};

              return (
                <tr
                  key={year}
                  onClick={() => {
                    console.log("Clicked!", year, driverId);
                    history.push(`/details/${year}/${driverId}`);
                  }}
                >
                  <th>{year}</th>
                  <td>
                    {givenName} {familyName}
                  </td>
                  <td>{dateOfBirth}</td>
                  <td>{nationality}</td>
                  <td>{wins}</td>
                  <td>{points}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default Champions;
