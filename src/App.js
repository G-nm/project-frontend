import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { useContext, createContext, useState } from "react";
import Main from "./auth/Main";
import Dashboard from "./dashboard/dashboard";
import { ProtectedRoute } from "./auth/protected.route";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact strict path="/" component={Main} />
        <ProtectedRoute path="/dash" component={Dashboard} />
        <Route path="*" component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
