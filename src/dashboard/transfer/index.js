import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Appcontext } from "../AppContext";

//Reason - The user can set an amount to send to all their recipients
// Functions calculate amount of money left before transfering on transfer click

// request with an amount is sent to the server at server amount is devided according to the number of recipients

export const Transfer = () => {
  const { errors, register, reset, handleSubmit, formState } = useForm();
  const {
    recipients,
    orgdetails,
    apperror,
    setAppError,
    appnotification,
    setAppNotification,
  } = useContext(Appcontext);
  const [transfervalue, setTransferValue] = useState(0);
  const [nextbalance, setNextBalance] = useState(0);
  let isdisabled = false;

  const submitdata = async (data) => {
    let { totalamount } = data;
    totalamount = totalamount.trim().split(" ");
    totalamount = parseInt(totalamount[0]);
    console.log(totalamount);

    // send request
    try {
      let result = await axios.post(
        `${process.env.REACT_APP_SERVER}/sendtoallrecipients`,
        {
          amount: totalamount,
        },
        { withCredentials: true }
      );
      console.log(result);
      if (result.status) {
        setAppNotification({ message: "Success" });
        reset();
      }
    } catch (error) {
      console.log(error);
      setAppError({
        ...apperror,
        errormessage: error.response.data,
      });
    }
  };

  useEffect(() => {
    setNextBalance(orgdetails?.balance - transfervalue * recipients?.length);
  }, [orgdetails?.balance, transfervalue, recipients?.length]);

  // let nextbalance = orgdetails?.balance - transfervalue * recipients?.length;
  if (nextbalance < 0 || nextbalance > orgdetails?.balance) {
    isdisabled = true;
  }

  return (
    <>
      <div className="w-full text-center pt-4 font-medium  text-xl">
        <span className="border-b-2 border-black">
          Transfer Tokens to All Recipients
        </span>
      </div>
      <form onSubmit={handleSubmit(submitdata)} className="mt-4 px-20">
        <div>
          <label htmlFor="amounttosend">Amount Per recipient(in Tokens):</label>
          <input
            type="number"
            placeholder="Amount to Send to Each Recipient"
            className={`block w-full border border-gray-300  pl-2 py-1 rounded focus:outline-none focus:border-green-300`}
            id="amounttosend"
            name="amount"
            onChange={(e) => setTransferValue(e.target.value)}
            ref={register({
              required: { value: true, message: "Amount is required" },
              // min: { value: 10, message: "Token Value is Too small" },
            })}
            autoFocus
            disabled={!recipients?.length && true}
          />

          <div className="text-center text-red-500">
            {errors?.amount?.type === "required" && (
              <div>{errors?.amount?.message}</div>
            )}
            {errors?.amount?.type === "min" && (
              <div>{errors?.amount?.message}</div>
            )}
            {!recipients?.length && <div>No Recipients found</div>}
          </div>
        </div>
        <div>
          <label htmlFor="recipientstotalamounttosend">
            Total Transfer Amount:
            <span className="">
              {" "}
              {`(${recipients.length} Recipients)`}
            </span>{" "}
          </label>
          <input
            type="text"
            placeholder="Total amount"
            className="block w-full border border-gray-300  pl-2 py-1 rounded focus:outline-none "
            id="recipientstotalamounttosend"
            name="totalamount"
            value={` ${
              isNaN(transfervalue * recipients?.length)
                ? 0
                : transfervalue * recipients?.length
            } Tokens`}
            readOnly
            ref={register()}
          />
        </div>
        <div>
          <label htmlFor="currentbalance">Current Balance:</label>
          <input
            type="text"
            placeholder="Current Balance"
            className="block w-full border  border-gray-300  pl-2 py-1 rounded focus:outline-none focus:border-green-300"
            id="currentbalance"
            name="currentbalance"
            value={orgdetails?.balance || ""}
            disabled
          />
        </div>
        <div>
          <label htmlFor="balanceafter">Balance after transaction:</label>
          <input
            type="number"
            placeholder="Next Balance"
            className={`block w-full border  border-gray-300  pl-2 py-1 rounded focus:outline-none focus:border-green-300 ${
              isdisabled && "border-red-600"
            }`}
            id="balanceafters"
            name="balanceafterdeduction"
            value={nextbalance || 0}
            disabled
          />
          <div className="text-center text-red-500">
            {orgdetails?.balance - transfervalue * recipients?.length < 0 && (
              <div>Insufficient Tokens</div>
            )}
          </div>
        </div>

        <div className="my-4 transform-gpu transition-all duration-1000">
          <button
            type="submit"
            className={` ${
              isdisabled || !recipients?.length
                ? "bg-red-400 text-black w-full p-2 transform-gpu transition-all duration-1000 rounded-md"
                : " bg-green-500 text-white w-full p-2 rounded-md hover:bg-green-400 transform-gpu transition-all duration-1000"
            }`}
            // disabled={isdisabled ? true : false}
          >
            Transfer to All Recipients
          </button>
        </div>
      </form>
    </>
  );
};
