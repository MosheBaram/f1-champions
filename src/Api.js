import axios from "axios";

const CONFIG = {
  APIURL: "https://ergast.com/api/f1/",
  DRIVERSTANDINGS: "driverStandings/1.json?limit=300",
  RESULTS: "/results/1.json",
};

const GetDataFromUrl = async (URL) => {
  return await axios.get(`${CONFIG.APIURL}${URL}`).then((res) => {
    const { data } = res;
    return data;
  });
};

// Make data easily chewable for the Champions component
const ProcessDriverStandings = (rawResponseData) => {
  if (!rawResponseData) {
    return null;
  }

  const { MRData } = rawResponseData;
  const { StandingsTable } = MRData ?? {};
  const { StandingsLists = [] } = StandingsTable ?? {};

  const responseObject = { keys: [], items: {} };

  StandingsLists.forEach((item) => {
    const { season, DriverStandings } = item ?? {};
    const seasonInt = parseInt(season, 10);
    if (seasonInt > 2004 && seasonInt < 2016) {
      responseObject.keys.push(seasonInt);
      responseObject.items[seasonInt] = DriverStandings?.[0];
    }
  });

  return responseObject;
};

export const GetDriverStandings = async () => {
  const data = await GetDataFromUrl(CONFIG.DRIVERSTANDINGS);
  return ProcessDriverStandings(data);
};

// Make data easily chewable for the Details component
const ProcessYearlyResults = (rawResponseData) => {
  if (!rawResponseData) {
    return null;
  }

  const { MRData } = rawResponseData;
  const { RaceTable } = MRData ?? {};
  const { Races } = RaceTable ?? {};

  return Races;
};

export const GetYearlyResults = async (year) => {
  const data = await GetDataFromUrl(`${year}${CONFIG.RESULTS}`);
  return ProcessYearlyResults(data);
};
