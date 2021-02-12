import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setError } from "../../features/errors/errorSlice";
import { getAsyncMerchantDetails } from "../../features/merchant/merchantSLice";
import { setNotification } from "../../features/notifications/notificationSlice";
export const TokenForm = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const verifytoken = async (data) => {
    try {
      dispatch(
        setNotification({ message: "Veryfying Code.....", status: "info" })
      );
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER}/completetransaction`,
        { ...data },
        {
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        dispatch(setNotification({ message: "Complete" }));
        dispatch(getAsyncMerchantDetails());
      }
    } catch (error) {
      dispatch(setError(Object.values(error.response.data).toString()));
    }

    reset();
  };
  const dispatch = useDispatch();
  return (
    <form onSubmit={handleSubmit(verifytoken)} className="p-4">
      <div className="text-center">
        <label htmlFor="token">Token</label>
        <br />
        <input
          type="text"
          name="token"
          ref={register({
            required: true,
            minLength: { value: 8, message: "Token is too short" },
          })}
          className="w-full border-2 rounded-md p-1 focus:outline-none"
        />
        <div className="text-red-600 ">
          {errors.token?.type === "required" && <span>This is required</span>}
          {errors.token?.type === "minLength" && (
            <span>{errors.token?.message}</span>
          )}
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-green-300 mt-4 p-2 rounded-md"
        >
          Verify token
        </button>
      </div>
    </form>
  );
};
