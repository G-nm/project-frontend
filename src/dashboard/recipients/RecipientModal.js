import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
// import { Appcontext } from "../AppContext";
import { TransfersinModal } from "./TransfersinModal";
import { USerDetailsForm } from "./SlideinUserDetailsForm";
import { useDispatch, useSelector } from "react-redux";
import { clearselectedrecipient } from "../../features/recipients/recipientsSlice";

export const RecipientModal = (props) => {
  // const { userdetails, setUserDetails } = useContext(Appcontext);
  // const { showuserdetails } = userdetails;
  const recipient = useSelector((state) => state.recipients.selectedrecipient);

  const dispatch = useDispatch();
  let isrecipientset = false;
  if (
    recipient &&
    Object.keys(recipient).length !== 0 &&
    recipient.constructor === Object
  ) {
    isrecipientset = true;
  }

  return (
    <div
      className={`absolute z-30 h-screen py-8 bg-yellow-200 w-full bg-opacity-60 flex justify-center items-center transform transition-all duration-1000 ${
        !isrecipientset && `-translate-x-full`
      } `}
    >
      <div className="w-5/6 h-full bg-white relative flex p-4 rounded-xl">
        <div className="flex-grow p-8 flex flex-row">
          <div className="w-1/2 flex flex-col ">
            <TransfersinModal />
          </div>
          <div className="w-1/2 ">
            <USerDetailsForm />
          </div>
        </div>
        <div
          className="text-3xl relative top-2 cursor-pointer "
          onClick={() => {
            dispatch(clearselectedrecipient());
          }}
        >
          <AiOutlineCloseCircle />
        </div>
      </div>
    </div>
  );
};
