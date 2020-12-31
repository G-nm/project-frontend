import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import parsePhoneNumber from "libphonenumber-js";
import { Appcontext } from "../AppContext";
import { validateidnumber, validatemobilenumber } from "./commonlogic";

export const USerDetailsForm = () => {
  const { register, handleSubmit, errors, reset } = useForm();

  const { setAppNotification, appnotification, userdetails } = useContext(
    Appcontext
  );

  const {
    firstname,
    lastname,
    idnumber,
    mobilenumber,
    balance,
    uuid,
  } = userdetails;

  const submitform = async (data) => {
    const internationalnumber = parsePhoneNumber(data.mobilenumber, "KE")
      .number;
    console.log([{ ...data, mobilenumber: internationalnumber }]);
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_SERVER}/updaterecipients`,
        [data],
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setAppNotification({
          ...appnotification,
          message: "User Submitted",
        });
      }
    } catch (error) {
      console.log(error);
    }

    reset();
  };

  return (
    <>
      <div className="text-center underline">Recipient Details</div>
      <form
        className="flex flex-wrap flex-col"
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
              ref={register({ required: true })}
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
              ref={register({ required: true })}
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
              defaultValue={mobilenumber}
              className="outline-none pl-1 rounded-lg py-1 border-2 w-full"
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
            <br />
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
          </span>
        </div>
        <div className=" text-center h-12 mt-2">
          <button
            type="submit"
            className=" w-3/4 border h-full rounded-lg text-lg bg-yellow-400 hover:bg-yellow-300 focus:outline-none"
          >
            Update Recipient
          </button>
        </div>
      </form>
      <div className="absolute bottom-5 right-5">
        <button className="bg-red-400 hover:bg-red-600 hover:text-white h-9 w-44 rounded-lg">
          Delete Recipient
        </button>
      </div>
    </>
  );
};
