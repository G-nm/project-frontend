import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../features/errors/errorSlice";
import { getAsyncMerchantDetails } from "../features/merchant/merchantSLice";
import { setNotification } from "../features/notifications/notificationSlice";

export const Redeem = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const { balance } = useSelector((state) => state.merchant);
  const dispatch = useDispatch();
  const redeemtokenformsubmit = async (data) => {
    console.log(data);
    try {
      dispatch(setNotification({ message: "Sending.....", status: "info" }));
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER}/redeemtokens`,
        { amount: data.tokenamount },
        {
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        dispatch(getAsyncMerchantDetails());
        dispatch(setNotification({ message: "Withdrawal complete" }));
        reset();
      }
    } catch (error) {
      dispatch(setError(Object.values(error.response.data).toString()));
    }
  };

  return (
    <section className=" w-full h-full flex justify-center items-center ">
      <form className="w-full" onSubmit={handleSubmit(redeemtokenformsubmit)}>
        <div className="px-4 text-center">
          <label htmlFor="tokenamount"> Amount</label>
          <br />
          <input
            type="number"
            className="w-full border-2 pl-1 focus:outline-none py-2 rounded-md"
            name="tokenamount"
            id="tokenamount"
            ref={register({
              required: true,
              validate: {
                isamounttohigh: (value) => parseInt(value) < parseInt(balance),
              },
            })}
          />
          <br />
          <span className="text-red-600 ">
            {errors.tokenamount?.type === "required" && (
              <span>This is required</span>
            )}
            {errors.tokenamount?.type === "isamounttohigh" && (
              <span>Amount is too high</span>
            )}
          </span>
        </div>
        <div className="text-center px-4 pt-2">
          <button
            type="submit"
            className="border w-full py-2 rounded-md bg-yellow-300"
          >
            Redeem Tokens
          </button>
        </div>
      </form>
    </section>
  );
};
