import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// import { useContext, createContext, useState } from "react";
import Main from "./auth/Main";
import { Dashboard } from "./dashboard/dashboard";
// import { ProtectedRoute } from "./auth/protected.route";
import { ProvideAuth } from "./auth/ProvideAuth";
import { ProtectedOrgRoute } from "./auth/ProtectedOrgRoute";
import { ProtectedMerchantRoute } from "./auth/ProtectedMerchantRoute";
import { MerchantDash } from "./merchant/MerchantDash";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route exact strict path="/" component={Main} />
          <ProtectedOrgRoute path="/dash" component={Dashboard} />
          <ProtectedMerchantRoute path="/merchant" component={MerchantDash} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
