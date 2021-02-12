import { useDispatch } from "react-redux";
import { removeNotification } from "../features/notifications/notificationSlice";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import React, { useEffect, useRef } from "react";

export const Notification = ({ notification }) => {
  const dispatch = useDispatch();
  const notificationelement = useRef();
  const { status, notification: message, id } = notification;

  const [show, setShow] = React.useState(false);

  // notification  should be shown for 4 secods then dissappear

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 5);
    setTimeout(() => {
      setShow(false);
    }, 4010);
    setTimeout(() => {
      dispatch(removeNotification(id));
    }, 5000);

    // return () => {
    //   setShow(false);
    // };
  }, [id, dispatch]);

  return (
    <div className="mb-4 relative z-30" key={id}>
      <div
        className={`z-30 px-3 ${
          status === "success" ? "bg-green-300" : "bg-yellow-300"
        } rounded-lg w-80 h-14  ${show ? "" : "-translate-x-full"} 
           flex items-center transform-gpu transition-all duration-700`}
        ref={notificationelement}
      >
        <span className="pr-5 flex-grow">{message}</span>
        <span className="">
          {status === "success" ? (
            <IoCheckmarkDoneSharp />
          ) : (
            <AiOutlineExclamationCircle />
          )}
        </span>
      </div>
    </div>
  );
};
