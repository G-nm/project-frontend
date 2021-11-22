import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../features/errors/errorSlice";
import { setNotification } from "../../features/notifications/notificationSlice";
import { getAsyncOrgDetails } from "../../features/organisations/orgSlice";
import { editrecipient } from "../../features/recipients/recipientsSlice";

export const Sendtoonerecipientform = ({ recipientid }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const recipient = useSelector((state) => state.recipients.selectedrecipient);
	const dispatch = useDispatch();
	const sendtoarecipientsubmit = async (data) => {
		try {
			dispatch(setNotification({ message: "Sending.....", status: "info" }));
			const response = await axios.post(
				`${process.env.REACT_APP_SERVER}/sendtoarecipient`,
				{
					...data,
					recipientid,
				},
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (response.status === 200) {
				dispatch(editrecipient({ ...recipient, ...response.data }));
				dispatch(getAsyncOrgDetails());
				dispatch(setNotification({ message: "Transfer Successfull" }));
				reset();
			}
		} catch (error) {
			dispatch(setError(Object.values(error.response.data).toString()));
		}
	};

	let { balance } = useSelector((state) => state.organisation);
	const recipientlength = Object.keys(recipient).length;

	React.useEffect(() => {
		reset();
	}, [recipientlength, reset]);

	return (
		<>
			<form onSubmit={handleSubmit(sendtoarecipientsubmit)}>
				<div className="mr-1 ">
					<label htmlFor="amount" className="">
						Send tokens to this recipient:
					</label>
					<br />
					<input
						type="number"
						placeholder="Amount"
						name="amount"
						id="amount"
						className="outline-none pl-1 rounded-lg py-1 border-2 w-3/4 "
						{...register("amount", {
							required: true,
							validate: {
								isamounttohigh: (value) =>
									parseInt(value) < parseInt(balance),
							},
						})}
					/>
					<br />
					<span className="text-red-600 ">
						{errors.amount?.type === "required" && (
							<span>This is required</span>
						)}
						{errors.amount?.type === "isamounttohigh" && (
							<span>Amount is too high</span>
						)}
					</span>
				</div>
				<button
					type="submit"
					className="bg-green-300 w-3/4 mt-1 rounded-md p-1"
				>
					Send
				</button>
			</form>
		</>
	);
};
