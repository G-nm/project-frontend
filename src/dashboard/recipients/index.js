import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncOrgDetails } from "../../features/organisations/orgSlice";

import { Fileuploadcomponent } from "./fileuploadcomponent";
import { Recipientsform } from "./recipientsform";
import { Recipientstable } from "./Recipientstable";

export const Recipient = (props) => {
	// const value = useAppContext();
	// console.log(`Myvalue`, value);
	const dispatch = useDispatch();

	const { loggedin } = useSelector((state) => state.auth);
	const status = useSelector((state) => state.organisation.status);

	// useEffect(() => {
	// 	if (status === "idle" && loggedin) {
	// 		dispatch(getAsyncOrgDetails());
	// 	}
	// }, [dispatch]);

	return (
		<section className="  rounded-2xl  p-2 flex flex-col">
			<article className="w-full row-span-2 ">
				<Fileuploadcomponent />
			</article>

			<article className="pt-2 ">
				<Recipientsform />
			</article>
			<article className="p-4 relative">
				<Recipientstable />
			</article>
		</section>
	);
};

//Drag and drop to add recipients
// Manual form to add recipients
//A table to see the recipients
//Buttons to delete a recipient or edit their data
// View a recipients current balance
