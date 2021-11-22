import axios from "axios";
import { parsePhoneNumber } from "libphonenumber-js";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { validateemail, validatemobilenumber } from "../dashboard/commonlogic";
import { ShowContext } from "./Showcontext";
export const OrganisationSignup = ({ showMerchant }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { setShow, setErrorAlert } = useContext(ShowContext);

	const [eye, SetEye] = React.useState(false);

	const selectvalues = {
		merchant: "Merchant",
		organisation: "Organisation",
	};
	const onsubmithandler = async (data) => {
		// console.log(data);
		try {
			let result = await axios.post(
				`${process.env.REACT_APP_SERVER}/signuporg`,
				data,
				{ withCredentials: true }
			);
			if (result.status === 200) {
				setShow(false);
			}
		} catch (error) {
			setErrorAlert(Object.values(error.response.data).toString());
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(onsubmithandler)}>
				<div>
					<label htmlFor="role">Role</label>
					<br />
					<select
						name="role"
						id="role"
						className="w-full h-9 pl-2 rounded outline-none border  bg-white"
						onChange={(e) => {
							if (e.target.value === "Merchant") {
								showMerchant();
							}
						}}
					>
						<option value={selectvalues.organisation} className="outline-none">
							Organisation
						</option>
						<option value={selectvalues.merchant} className="outline-none">
							Merchant
						</option>
					</select>
				</div>

				<div>
					<label htmlFor="name">Organisation's Name</label>
					<input
						type="text"
						id="name"
						name="name"
						className="w-full h-9 pl-2 rounded outline-none border"
						{...register("name", {
							required: true,
							minLength: { value: 2, message: "Name is too short" },
						})}
					/>
					<span className="text-red-500">
						{errors.name?.type === "required" && <span>This is required</span>}
						{errors.name?.type === "minLength" && (
							<span>{errors.name?.message}</span>
						)}
					</span>
				</div>
				<div>
					<label htmlFor="email">Email:</label>

					<input
						type="email"
						id="email"
						className="w-full h-9 pl-2 rounded outline-none border"
						name="email"
						{...register("email", {
							required: true,
							validate: {
								isEmailValid: async (value) => await validateemail(value),
							},
						})}
					/>
					<span className="text-red-500">
						{errors.email?.type === "required" && <span>This is required</span>}
						{errors.email?.type === "isEmailValid" && (
							<span>Email has been used</span>
						)}
					</span>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<div className="flex border rounded">
						<span className="flex-grow">
							<input
								type={eye ? "text" : "password"}
								id="pass"
								name="password"
								className="w-full h-9 pl-2 rounded outline-none  col-span-2 "
								{...register("password", {
									required: true,
									minLength: { value: 2, message: "Password is too short" },
								})}
							/>
						</span>

						<span className="mt-2 text-xl">
							{eye ? (
								<FiEye
									className="  cursor-pointer "
									onClick={() => {
										SetEye(false);
									}}
								/>
							) : (
								<FiEyeOff
									className=" cursor-pointer"
									onClick={() => {
										SetEye(true);
									}}
								/>
							)}
						</span>
					</div>
					<span className="text-red-500">
						{errors.password?.type === "required" && (
							<span>This is required</span>
						)}
						{errors.password?.type === "minLength" && (
							<span>Password is too short</span>
						)}
					</span>
				</div>
				<div>
					<label htmlFor="mobile">Mobile Number</label>
					<br />
					<input
						type="number"
						id="mobile"
						className="w-full h-9 pl-2 rounded outline-none border"
						name="mobilenumber"
						{...register("mobilenumber", {
							required: { value: true, message: "Mobile number is required" },
							validate: {
								isnumbervalid: (value) => {
									if (value === "0") {
										return false;
									}
									return parsePhoneNumber(value, "KE")?.isValid();
								},
								isnumberUsed: async (value) =>
									await validatemobilenumber(value),
							},
							minLength: {
								value: 10,
								message: "Enter a valid mobile number",
							},
						})}
					/>
					<span className="text-red-600 ">
						{errors.mobilenumber?.type === "required" && (
							<span>This is required</span>
						)}
						{errors.mobilenumber?.type === "minLength" && (
							<span>{errors.mobilenumber?.message}</span>
						)}
						{errors.mobilenumber?.type === "isnumbervalid" && (
							<span>Invalid Number</span>
						)}
						{errors.mobilenumber?.type === "isnumberUsed" && (
							<span>Number has been used</span>
						)}
					</span>
				</div>
				<button
					className="text-center w-full bg-yellow-300 text-black h-9 mt-5 rounded outline-none font-medium"
					type="submit"
				>
					Sign up
				</button>
			</form>
		</>
	);
};
