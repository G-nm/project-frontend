import React, { useContext } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Appcontext } from "../AppContext";
import { TransfersinModal } from "./TransfersinModal";
import { USerDetailsForm } from "./SlideinUserDetailsForm";

export const RecipientModal = (props) => {
  const { userdetails, setUserDetails } = useContext(Appcontext);
  const { showuserdetails } = userdetails;

  return (
    <div
      className={`absolute z-30 h-screen bg-yellow-200 w-full bg-opacity-60 flex justify-center items-center transform-gpu transition-all duration-1000 ${
        !showuserdetails && `-translate-x-full`
      } `}
    >
      <div className="w-3/4 h-3/4 bg-white relative flex p-4 rounded-xl">
        <div className="flex-grow p-8 flex flex-row">
          <div className="w-1/2 flex flex-col border-gray-200 border-r border-l rounded-xl rounded-b-none rounded-t-none">
            <TransfersinModal />
          </div>
          <div className="w-1/2 ">
            <USerDetailsForm />
          </div>
        </div>
        <div
          className="text-3xl relative top-2 cursor-pointer "
          onClick={() => {
            setUserDetails({ ...userdetails, showuserdetails: false });
            setTimeout(() => {
              setUserDetails({
                ...userdetails,
                showuserdetails: false,
                firstname: "",
                lastname: "",
                idnumber: "",
                mobilenumber: "",
                balance: "",
                uuid: "",
              });
            }, 1000);
          }}
        >
          <AiOutlineCloseCircle />
        </div>
      </div>
    </div>
  );
};
