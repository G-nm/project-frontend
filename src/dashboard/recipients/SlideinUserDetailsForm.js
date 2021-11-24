import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import parsePhoneNumber from "libphonenumber-js";

import { validateidnumber, validatemobilenumber } from "../commonlogic";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../../features/errors/errorSlice";
import { setNotification } from "../../features/notifications/notificationSlice";
import {
	editrecipient,
	deleterecipient,
	clearselectedrecipient,
} from "../../features/recipients/recipientsSlice";
import { Sendtoonerecipientform } from "./Sendtoonerecipientform";
import { getAsyncOrgDetails } from "../../features/organisations/orgSlice";

export const USerDetailsForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const recipient = useSelector((state) => state.recipients.selectedrecipient);

	const dispatch = useDispatch();

	const recipientlength = Object.keys(recipient).length;

	React.useEffect(() => {
		reset();
	}, [recipientlength, reset]);
	// !Object.keys(recipient).length && clearErrors;

	const { firstname, lastname, idnumber, mobilenumber, userid, address } =
		recipient;

	const { notifications } = useSelector((state) => state.notifications);

	const deletearecipient = async () => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_SERVER}/deleterecipient`,
				{
					recipientid: recipient.userid,
				},
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (response.status === 200) {
				dispatch(getAsyncOrgDetails());
				dispatch(clearselectedrecipient());
				dispatch(deleterecipient(userid));
				dispatch(setNotification({ message: "Delete Successfull" }));
			}
		} catch (error) {}
	};

	const submitform = async (data) => {
		const internationalnumber = parsePhoneNumber(
			data.mobilenumber,
			"KE"
		).number;
		data = { ...data, mobilenumber: internationalnumber };

		let checkforchanges = () => {
			let datakeys = Object.keys(data);
			let ischanges = true;
			for (const key of datakeys) {
				if (data[key] === recipient[key]) {
					ischanges = ischanges && true;
				} else {
					ischanges = ischanges && false;
				}
			}

			return ischanges;
		};
		// console.log();
		let nochanges = checkforchanges();
		// console.log(nochanges);
		if (!nochanges) {
			try {
				let response = await axios.post(
					`${process.env.REACT_APP_SERVER}/updaterecipient`,
					{ ...data, userid },
					{
						withCredentials: true,
					}
				);

				if (response.status === 200) {
					// console.log(response);
					dispatch(editrecipient(response.data));
					dispatch(
						setNotification({ message: "User Successfully Updated" })
					);
				}
			} catch (error) {
				dispatch(setError(Object.values(error.response.data)));
			}
		} else {
			let isnotificationset = notifications.filter(
				(notification) => notification.id === recipient.userid.concat("up")
			);
			// console.log(isnotificationset);
			if (isnotificationset.length === 0) {
				dispatch(
					setNotification({
						message: "No Changes made",
						status: "info",
						id: recipient.userid.concat("up"),
					})
				);
			}
		}
	};

	return (
		<div className="">
			<div className="text-center underline">Recipient Details</div>
			<form
				className="flex flex-wrap flex-col "
				onSubmit={handleSubmit(submitform)}
			>
				<div className="flex justify-center flex-wrap">
					<span className="mr-1 w-3/4">
						<label htmlFor="firstnamemodal" className="">
							FirstName:
						</label>
						<br />
						<input
							type="text"
							placeholder="First Name"
							name="firstname"
							id="firstnamemodal"
							defaultValue={firstname}
							className="outline-none pl-1 rounded-lg py-1 border-2 w-full"
							{...register("firstname", { required: true })}
						/>
						<br />
						<span className="text-red-600 ">
							{errors.firstname && <span>This is required</span>}
						</span>
					</span>
					<span className="mr-1 w-3/4">
						<label htmlFor="lastnamemodal" className="">
							LastName:
						</label>
						<br />
						<input
							type="text"
							placeholder="Last Name"
							name="lastname"
							id="lastnamemodal"
							defaultValue={lastname}
							className="outline-none pl-1 rounded-lg py-1 border-2 w-full"
							{...register("lastname", { required: true })}
						/>
						<br />
						<span className="text-red-600 ">
							{errors.lastname && <span>This is required</span>}
						</span>
					</span>
					<span className="mr-1 w-3/4">
						<label htmlFor="idnumbermodal" className="">
							Id Number
						</label>
						<br />
						<input
							type="number"
							placeholder="Id Number"
							name="idnumber"
							id="idnumbermodal"
							defaultValue={idnumber}
							className="outline-none pl-1 rounded-lg py-1 border-2 w-full"
							{...register("idnumber", {
								required: true,
								// if the id number has changed check if it has been used else return true for no form error
								validate: {
									isIdValid: async (value) => {
										if (value !== idnumber) {
											let isused = await validateidnumber(value);
											return isused;
										} else {
											return true;
										}
									},
								},
								minLength: {
									value: 7,
									message: " Id number to short ",
								},
								maxLength: {
									value: 8,
									message: "Id number is too long",
								},
							})}
						/>
						<br />
						<span className="text-red-600 ">
							{errors.idnumber?.type === "required" && (
								<span>This is required</span>
							)}
							{errors.idnumber?.type === "minLength" && (
								<span>{errors.idnumber?.message}</span>
							)}
							{errors.idnumber?.type === "isIdValid" && (
								<span> Id Number has been used</span>
							)}
							{errors.idnumber?.type === "maxLength" && (
								<span>{errors.idnumber?.message}</span>
							)}
						</span>
					</span>
					<span className="mr-1 w-3/4">
						<label htmlFor="mobilenumbermodal" className="">
							Mobile Number
						</label>
						<br />
						<input
							type="number"
							placeholder="Mobile Number"
							name="mobilenumber"
							id="mobilenumbermodal"
							defaultValue={
								mobilenumber
									? 0 +
									  parsePhoneNumber(mobilenumber, "KE")
											?.nationalNumber
									: ""
							}
							className="outline-none pl-1 rounded-lg py-1 border-2 w-full"
							{...register("mobilenumber", {
								required: {
									value: true,
									message: "Mobile number is required",
								},
								validate: {
									isnumbervalid: (value) => {
										value = value.toString();
										return parsePhoneNumber(value, "KE")?.isValid();
									},
									// if mobilenumber has changed check if it has been used else not
									isnumberUsed: async (value) => {
										value = parsePhoneNumber(value, "KE")?.number;

										if (value !== mobilenumber) {
											let ismobilenumberused =
												await validatemobilenumber(value);
											return ismobilenumberused;
										} else {
											return true;
										}
									},
								},
								minLength: {
									value: 10,
									message: "Enter a valid mobile number",
								},
							})}
						/>
						<br />
						<span className="text-red-600 ">
							{errors.mobilenumber?.type === "required" && (
								<span>This is required</span>
							)}
							{errors.mobilenumber?.type === "minLength" && (
								<span>{errors.mobilenumber?.message}</span>
							)}
							{errors.mobilenumber?.type === "isnumbervalid" && (
								<span>Invalid mobile number</span>
							)}
							{errors.mobilenumber?.type === "isnumberUsed" && (
								<span>Number has been used</span>
							)}
						</span>
					</span>
				</div>
				<div className=" text-center h-8 mt-2">
					<button
						type="submit"
						className=" w-3/4 border h-full rounded-lg  bg-yellow-400 hover:bg-yellow-300 focus:outline-none"
					>
						Update Recipient
					</button>
				</div>
				<div className=" text-center h-8 mt-2">
					<button
						type="button"
						className=" w-3/4 border h-full rounded-lg text-lg bg-gray-400 hover:bg-gray-300 focus:outline-none"
					>
						<a
							href={`https://kovan.etherscan.io/address/${address}`}
							target="_blank"
							rel="noreferrer"
						>
							View Account on Etherscan
						</a>
					</button>
				</div>
			</form>
			<div className=" text-center ">
				<Sendtoonerecipientform recipientid={userid} />
			</div>

			<div className="absolute bottom-5 right-5">
				<button
					className="bg-red-400 hover:bg-red-600 hover:text-white h-9 w-44 rounded-lg"
					onClick={deletearecipient}
				>
					Delete Recipient
				</button>
			</div>
		</div>
	);
};
