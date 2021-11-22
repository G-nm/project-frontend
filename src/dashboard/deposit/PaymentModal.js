import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { clearselectedproduct } from "../../features/products/productsSLice";
import { setNotification } from "../../features/notifications/notificationSlice";
import { setError } from "../../features/errors/errorSlice";

// to do now add a close button to modal which empties all fields
// set a state on click in deposit page

export const PaymentModal = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const stripe = useStripe();
	const elements = useElements();

	const { selectedproduct } = useSelector((state) => state.products);
	const dispatch = useDispatch();
	const closemodal = () => {
		const cardElement = elements?.getElement(CardElement);
		cardElement?.clear();
		reset();
		dispatch(clearselectedproduct());
	};

	const submithandle = async (data) => {
		if (!stripe || !elements) {
			return;
		}

		// get the card element
		const cardElement = elements.getElement(CardElement);
		let clientSecret;
		try {
			let { data } = await axios.post(
				`${process.env.REACT_APP_SERVER}/secret`,
				{
					productname: selectedproduct.name,
				},
				{ withCredentials: true }
			);

			if (data.error) {
				console.log(data.error);
				return;
			} else {
				clientSecret = data.client_secret;
			}
		} catch (error) {
			console.log("Error", error);
		}
		// console.log(clientSecret);
		const result = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: cardElement,
				billing_details: {
					name: data.name,
					email: data.email,
				},
			},
		});
		if (result.error) {
			console.log(result.error.message);
			dispatch(setError(result.error.message));
		} else {
			if (result.paymentIntent.status === "succeeded") {
				// console.log("success");
				cardElement.clear();
				dispatch(clearselectedproduct());
				dispatch(setNotification({ message: "Payment Successfull" }));
			}
		}
	};

	return (
		<>
			<div
				className={`absolute z-20 h-screen bg-green-100 w-full bg-opacity-60 flex justify-center items-center overflow-hidden transform-gpu transition-all duration-1000 ${
					!Object.keys(selectedproduct).length && "-translate-y-full"
				} `}
			>
				<div className="w-1/4 h-4/6 bg-white p-4 relative">
					<AiOutlineCloseCircle
						className="cursor-pointer text-2xl absolute right-3 top-3 text-red-600"
						onClick={closemodal}
					/>
					<div className="text-center text-lg my-4 font-bold">
						MTOG Tokens Purchase
					</div>
					<form
						className="mb-4 flex h-full flex-col "
						onSubmit={handleSubmit(submithandle)}
					>
						<div>
							<label htmlFor="name" className="">
								Name:
							</label>
							<br />
							<input
								type="text"
								placeholder="Name"
								name="name"
								id="name"
								className="outline-none pl-1 rounded py-1 border w-full"
								{...register("name", { required: true })}
							/>
							<span className="text-red-600 ">
								{errors.name && <span>This is required</span>}
							</span>
						</div>
						<div>
							<label htmlFor="email" className="">
								Email:
							</label>
							<br />
							<input
								type="email"
								placeholder="Email"
								name="email"
								id="email"
								className="outline-none pl-1 rounded py-1 border w-full"
								{...register("email", { required: true })}
							/>
							<span className="text-red-600 ">
								{errors.email && <span>This is required</span>}
							</span>
						</div>
						<div className="flex-grow ">
							<label htmlFor="">Card information:</label>
							<div className="border pl-1 py-2 rounded">
								<CardElement />
							</div>
						</div>
						<div className="flex-grow  ">
							<button
								type="submit"
								className="w-full bg-green-500 mt-4 p-2 rounded-lg text-white relative bottom-0"
							>
								Pay {selectedproduct.price?.toLocaleString()} KShs
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};
