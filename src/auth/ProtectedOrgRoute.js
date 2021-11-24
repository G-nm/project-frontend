import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedOrgRoute = ({ children }) => {
	// Check if user is logged in
	// Check if user has org role
	let location = useLocation();

	const { role, loggedin } = useSelector((state) => state.auth);

	if (!loggedin || role !== "Organisation") {
		return <Navigate to={"/"} state={{ from: location }} />;
	}
	return children;
};
