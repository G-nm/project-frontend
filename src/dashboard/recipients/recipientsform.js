import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import parsePhoneNumber from "libphonenumber-js";

export const Recipientsform = () => {
  const { register, handleSubmit, errors, reset } = useForm();

  const validatemobilenumber = async (value) => {
    try {
      const ismobilenumberused = await axios.post(
        "http://localhost:3636/checkmobilenumber",
        {
          mobilenumber: value,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (ismobilenumberused.data.ismobilenumberpresent === 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  const validateidnumber = async (value) => {
    try {
      let isidnumberused = await axios.post(
        "http://localhost:3636/checkid",
        {
          idnumber: value,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (isidnumberused.data.isidpresent === 0) {
        // clearErrors("idnumberused");

        return true;
      } else {
        // setError("idnumberused", {
        //   type: "validate",
        //   message: "This Id number is in use",
        // });
        return false;
      }
    } catch (error) {
      // setError("idnumberused", {
      //   type: "validate",
      //   message: "This Id number is in use",
      // });
      return false;
    }
  };

  const submitform = (data) => {
    const internationalnumber = parsePhoneNumber(data.mobilenumber, "KE")
      .number;
    console.log({ ...data, mobilenumber: internationalnumber });
    // console.log(parsePhoneNumber(data.mobilenumber, "KE").isValid());
    reset();
  };

  return (
    <>
      <div className="text-center underline">Add Recipient</div>
      <form
        className="flex flex-wrap flex-col"
        onSubmit={handleSubmit(submitform)}
      >
        <div className="flex justify-center flex-wrap">
          <span className="mr-1 text-center flex-grow">
            <label htmlFor="firstname" className="">
              FirstName:
            </label>
            <br />
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              id="firstname"
              className="outline-none pl-1 rounded-lg py-1 border-2 w-full"
              ref={register({ required: true })}
            />
            <br />
            <span className="text-red-600 ">
              {errors.firstname && <span>This is required</span>}
            </span>
          </span>
          <span className="mr-1 text-center flex-grow">
            <label htmlFor="lastname" className="">
              LastName:
            </label>
            <br />
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              id="lastname"
              className="outline-none pl-1 rounded-lg py-1 border-2 w-full"
              ref={register({ required: true })}
            />
            <br />
            <span className="text-red-600 ">
              {errors.lastname && <span>This is required</span>}
            </span>
          </span>
          <span className="mr-1 text-center flex-grow">
            <label htmlFor="idnumber" className="">
              Id Number
            </label>
            <br />
            <input
              type="number"
              placeholder="Id Number"
              name="idnumber"
              id="idnumber"
              className="outline-none pl-1 rounded-lg py-1 border-2 w-full"
              ref={register({
                required: true,
                validate: {
                  isIdValid: async (value) => await validateidnumber(value),
                },
                minLength: { value: 8, message: " Id number to short " },
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
            </span>
          </span>
          <span className="mr-1 text-center flex-grow">
            <label htmlFor="mobilenumber" className="">
              Mobile Number
            </label>
            <br />
            <input
              type="number"
              placeholder="Mobile Number"
              name="mobilenumber"
              id="mobilenumber"
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
            className=" w-full border h-full rounded-lg bg-green-200 hover:bg-green-400 focus:outline-none"
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};
