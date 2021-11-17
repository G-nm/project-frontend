import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
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
				<Routes>
					<Route path="/" element={<Main />} />
					<Route
						path="/dash"
						element={
							<ProtectedOrgRoute>
								<Dashboard />
							</ProtectedOrgRoute>
						}
					/>
					<Route
						path="/merchant"
						element={
							<ProtectedMerchantRoute>
								<MerchantDash />
							</ProtectedMerchantRoute>
						}
					/>

					<Route path="*" element={<Navigate to="/" />}></Route>
				</Routes>
			</Router>
		</ProvideAuth>
	);
}

export default App;
