import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Champions from "./pages/Champions";
import Details from "./pages/Details";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Champions} />
        <Route path="/details/:year/:driverId" component={Details} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
