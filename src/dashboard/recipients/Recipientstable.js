import { parsePhoneNumber } from "libphonenumber-js";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../features/errors/errorSlice";

import {
  requestrecipients,
  selectallrecipients,
  selectedrecipient,
} from "../../features/recipients/recipientsSlice";

export const Recipientstable = () => {
  const recipients = useSelector(selectallrecipients);
  const dispatch = useDispatch();

  const status = useSelector((state) => state.recipients.status);
  useEffect(() => {
    let getrecipients = async () => {
      let resultaction;
      if (status === "idle") {
        resultaction = await dispatch(requestrecipients());
      }
      if (resultaction?.type) {
        if (requestrecipients.fulfilled.match(resultaction)) {
          // dispatch(
          //   setNotification({ message: "Success fully selected recipients" })
          // );
        }
        if (requestrecipients.rejected.match(resultaction)) {
          dispatch(setError(resultaction.payload));
        }
      }
      // console.log(resultaction);
    };
    getrecipients();
  }, [dispatch, status]);

  return (
    <>
      <table className="w-full table-fixed border-collapse  ">
        <thead>
          <tr className="">
            <th className="border-t-2 p-2">Firstname</th>
            <th className="border-t-2">Lastname</th>
            <th className="border-t-2">Id Number</th>
            <th className="border-t-2">Mobile Number</th>
            <th className="border-t-2">Balance</th>

            <th className="border-t-2">Profile</th>
          </tr>
        </thead>
        <tbody className="">
          {status === "pending" ? (
            <tr>
              <td colSpan="7" className="text-center hover:bg-yellow-100">
                Loading ....
              </td>
            </tr>
          ) : recipients.length !== 0 ? (
            recipients.map((recipient) => {
              return (
                <tr
                  className="text-center hover:bg-yellow-100"
                  key={recipient.userid}
                >
                  <td className="border-t-2 p-2">{recipient.firstname}</td>
                  <td className="border-t-2">{recipient.lastname}</td>
                  <td className="border-t-2">{recipient.idnumber}</td>
                  <td className="border-t-2">
                    {0 +
                      parsePhoneNumber(recipient.mobilenumber, "KE")
                        ?.nationalNumber}
                  </td>
                  <td className="border-t-2">{recipient.balance} MTOG</td>

                  <td className="border-t-2 p-2">
                    <button
                      type="button"
                      className="bg-yellow-400 text-gray-900  rounded-lg p-1  w-32 h-10 outline-none focus:outline-none hover:bg-yellow-500"
                      onClick={() => {
                        dispatch(selectedrecipient(recipient));
                      }}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr key={recipients.length}>
              <td colSpan="7" className="text-center hover:bg-yellow-100">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
