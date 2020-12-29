import { BrowserRouter as Router, Route, Switch,Redirect } from "react-router-dom";
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
          <Route path="*" >
              <Redirect to="/"/>
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
