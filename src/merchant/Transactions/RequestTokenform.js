import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setNotification } from "../../features/notifications/notificationSlice";
import { setError } from "../../features/errors/errorSlice";
export const RequestTokenform = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const dispatch = useDispatch();
  const requestform = async (data) => {
    console.log(data);
    // dispatch(setNotification({ message: "Token Requested", status: "info" }));
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER}/maketransaction`,
        { ...data },
        {
          withCredentials: true,
        }
      );

      if (result.status === 200) {
        dispatch(setNotification({ message: "Complete" }));
      }
    } catch (error) {
      dispatch(setError(Object.values(error.response.data).toString()));
    }
    reset();
  };

  return (
    <form className="p-4" onSubmit={handleSubmit(requestform)}>
      <div className="flex justify-evenly">
        <span className="text-center">
          <label htmlFor="idnumber">Id number</label>
          <br />
          <input
            type="number"
            name="idnumber"
            id="idnumber"
            className="border-2 rounded-md focus:outline-none pl-2 py-1"
            ref={register({
              required: true,
              minLength: { value: 7, message: "Idnumber too short" },
              maxLength: { value: 8, message: "Idnumber too long " },
            })}
          />
          <br />
          <span className="text-red-600 ">
            {errors.idnumber?.type === "required" && (
              <span>This is required</span>
            )}
            {errors.idnumber?.type === "minLength" && (
              <span>{errors.idnumber.message}</span>
            )}
            {errors.idnumber?.type === "maxLength" && (
              <span>{errors.idnumber.message}</span>
            )}
          </span>
        </span>
        <span className="text-center">
          <label htmlFor="amount">Amount</label>
          <br />
          <input
            type="number"
            name="amount"
            id="amount"
            className="border-2 rounded-md focus:outline-none pl-2 py-1"
            ref={register({
              required: true,
              min: { value: 1, message: "Amount is too low" },
            })}
          />
          <br />
          <span className="text-red-600 ">
            {errors.amount && <span>This is required</span>}
          </span>
        </span>
      </div>
      <button
        type="submit"
        className="w-full bg-yellow-300 mt-4 p-2 rounded-md"
      >
        Send Request
      </button>
    </form>
  );
};
