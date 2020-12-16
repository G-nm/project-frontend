/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { ShowContext } from "./Showcontext";

const Main = (props) => {
  const [show, setShow] = React.useState(true);
  const [erroralert, setErrorAlert] = React.useState("");
  useEffect(() => {
    setTimeout(() => {
      setErrorAlert("");
    }, 5000);
  }, [erroralert]);

  return (
    <>
      <div className="flex justify-center ">
        <div className="bg-red-500 w-2/5 text-center text-white">
          {erroralert}
        </div>
      </div>
      <div className="flex justify-center  h-full font-sans  my-8">
        <div className="shadow-2xl md:w-3/12  h-full ">
          <div className="">
            <button
              className={
                !show
                  ? " w-1/2 text-center bg-gray-900 text-white float-left h-16 text-2xl outline-none focus:outline-none shadow-gl"
                  : " w-1/2 text-center bg-white float-left h-16 text-2xl outline-none focus:outline-none "
              }
              onClick={(e) => {
                setShow(false);
              }}
            >
              <span className="font-semibold">LOG IN</span>
            </button>
            <button
              className={
                show
                  ? " w-1/2 text-center bg-gray-900 text-white float-right h-16 text-2xl outline-none focus:outline-none shadow-lg"
                  : " w-1/2 text-center bg-white float-right h-16 text-2xl outline-none focus:outline-none "
              }
              onClick={() => {
                setShow(true);
              }}
            >
              <span className="font-semibold">SIGN UP</span>
            </button>
          </div>
          <div className="w-full px-12 pb-10  h-full">
            <ShowContext.Provider value={{ setShow, setErrorAlert }}>
              {show && <Signup />}
              {!show && <Login routerprops={props} />}
            </ShowContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
