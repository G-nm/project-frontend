import React, { useContext } from "react";
import { Appcontext } from "../AppContext";

export const Recipientstable = () => {
  const { recipients, userdetails, setUserDetails } = useContext(Appcontext);

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
            <th className="border-t-2">Status</th>
            <th className="border-t-2">Profile</th>
          </tr>
        </thead>
        <tbody className="">
          {recipients.length !== 0 ? (
            recipients.map((recipient) => {
              return (
                <tr
                  className="text-center hover:bg-yellow-100"
                  key={recipient.uuid}
                >
                  <td className="border-t-2 p-2">{recipient.firstname}</td>
                  <td className="border-t-2">{recipient.lastname}</td>
                  <td className="border-t-2">{recipient.idnumber}</td>
                  <td className="border-t-2">{recipient.mobilenumber}</td>
                  <td className="border-t-2">{recipient.balance} MTOG</td>
                  <td className="border-t-2">{recipient.status}</td>
                  <td className="border-t-2 p-2">
                    <button
                      type="button"
                      className="bg-yellow-400 text-gray-900  rounded-lg p-1  w-32 h-10 outline-none focus:outline-none hover:bg-yellow-500"
                      onClick={() => {
                        setUserDetails({
                          ...userdetails,
                          showuserdetails: true,
                          firstname: recipient.firstname,
                          lastname: recipient.lastname,
                          idnumber: recipient.idnumber,
                          mobilenumber: recipient.mobilenumber,
                          balance: recipient.balance,
                          uuid: recipient.uuid,
                        });
                      }}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
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
