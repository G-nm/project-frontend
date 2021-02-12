import axios from "axios";
import { parsePhoneNumber } from "libphonenumber-js";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  validateemail,
  validateidnumber,
  validatemobilenumber,
} from "../dashboard/commonlogic";
import { ShowContext } from "./Showcontext";
export const MerchantComponent = ({ showOrganisation }) => {
  const { register, handleSubmit, errors } = useForm();
  const { setShow, setErrorAlert } = useContext(ShowContext);

  const [eye, SetEye] = useState(false);

  const selectvalues = {
    merchant: "Merchant",
    organisation: "Organisation",
  };
  const onsubmithandler = async (data) => {
    // console.log(data);
    try {
      let result = await axios.post(
        `${process.env.REACT_APP_SERVER}/signupmerchant`,
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
            className="w-full h-9 pl-2 rounded outline-none border bg-white"
            onChange={showOrganisation}
          >
            <option value={selectvalues.merchant} className="outline-none">
              Merchant
            </option>
            <option value={selectvalues.organisation} className="outline-none">
              Organisation
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="firstname">First name</label>
          <br />
          <input
            type="text"
            id="firstname"
            name="firstname"
            className="w-full h-9 pl-2 rounded outline-none border"
            ref={register({
              required: true,
              minLength: { value: 2, message: "firstname is too short" },
            })}
          />
          <span className="text-red-500">
            {errors.firstname?.type === "required" && (
              <span>This is required</span>
            )}
            {errors.firstname?.type === "minLength" && (
              <span>{errors.firstname?.message}</span>
            )}
          </span>
        </div>
        <div>
          <label htmlFor="lastname">Last name</label>
          <br />
          <input
            type="text"
            id="lastname"
            className="w-full h-9 pl-2 rounded outline-none border"
            name="lastname"
            ref={register({
              required: true,
              minLength: { value: 2, message: "lastname is too short" },
            })}
          />
          <span className="text-red-500">
            {errors.lastname?.type === "required" && (
              <span>This is required</span>
            )}
            {errors.lastname?.type === "minLength" && (
              <span>{errors.lastname?.message}</span>
            )}
          </span>
        </div>
        <div>
          <label htmlFor="Storename">Store name</label>
          <br />
          <input
            type="text"
            id="storename"
            className="w-full h-9 pl-2 rounded outline-none border"
            name="storename"
            ref={register({
              required: true,
              minLength: { value: 2, message: "Store name is too short" },
            })}
          />
          <span className="text-red-500">
            {errors.storename?.type === "required" && (
              <span>This is required</span>
            )}
            {errors.storename?.type === "minLength" && (
              <span>{errors.storename?.message}</span>
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
            ref={register({
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
                ref={register({
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
            ref={register({
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
        <div>
          <label htmlFor="idnumber" className="">
            Id Number
          </label>
          <br />
          <input
            type="number"
            placeholder="Id Number"
            name="idnumber"
            id="idnumber"
            className="w-full h-9 pl-2 rounded outline-none border"
            ref={register({
              required: true,
              validate: {
                isIdValid: async (value) => await validateidnumber(value),
              },
              minLength: { value: 7, message: " Id number to short " },
              maxLength: { value: 8, message: "Id number is too long" },
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
              <span>Invalid Id Number</span>
            )}
            {errors.idnumber?.type === "maxLength" && (
              <span>{errors.idnumber?.message}</span>
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
