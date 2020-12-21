import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export const Recipientsform = () => {
  const { register, handleSubmit, errors, setError, clearErrors } = useForm();

  const validatemobilenumber = async (value) => {
    try {
      let ismobilenumberused = await axios.post(
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
        clearErrors("mobilenumberused");

        return true;
      } else {
        setError("mobilenumberused", {
          type: "validate",
          message: "This Mobile number is in use",
        });
        // return false;
      }
    } catch (error) {
      setError("mobilenumberused", {
        type: "validate",
        message: "This Mobile number is in use",
      });
      // return false;
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
        clearErrors("idnumberused");

        return true;
      } else {
        setError("idnumberused", {
          type: "validate",
          message: "This Id number is in use",
        });
        // return false;
      }
    } catch (error) {
      setError("mobilenumberused", {
        type: "validate",
        message: "This Id number is in use",
      });
      // return false;
    }
  };

  const submitform = (data, e) => {
    console.log(data);
    e.target.reset();
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
              type="text"
              placeholder="Id Number"
              name="idnumber"
              id="idnumber"
              className="outline-none pl-1 rounded-lg py-1 border-2 w-full"
              ref={register({ required: true, validate: validateidnumber })}
            />
            <br />
            <span className="text-red-600 ">
              {errors.idnumber && <span>This is required</span>}
              {errors.idnumberused && (
                <span>{errors.idnumberused.message}</span>
              )}
            </span>
          </span>
          <span className="mr-1 text-center flex-grow">
            <label htmlFor="mobilenumber" className="">
              Mobile Number
            </label>
            <br />
            <input
              type="text"
              placeholder="Mobile Number"
              name="mobilenumber"
              id="mobilenumber"
              className="outline-none pl-1 rounded-lg py-1 border-2 w-full"
              ref={register({ required: true, validate: validatemobilenumber })}
            />
            <br />
            <span className="text-red-600 ">
              {errors.mobilenumber && <span>This is required</span>}
            </span>
            <span className="text-red-600 ">
              {errors.mobilenumberused && (
                <span>{errors.mobilenumberused.message}</span>
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
