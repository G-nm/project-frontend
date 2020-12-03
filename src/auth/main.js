import React from "react";
import { useState } from "react";
import Login from "./login";
import Signup from "./signup";

const AuthNav = ({setlogin}) => {

    const signup=()=>{

    }

  return (
    <>
      <section className="w-full mb-10 ">
        <button
          type=""
          className=" active text-center w-1/2 h-20 text-3xl bg-white text-black font-medium shadow-md  hover:shadow-xl focus:bg-gray-800 focus:text-white "
        >
          LOG IN
        </button>
        <button className=" text-center w-1/2 h-20 text-3xl bg-white text-black font-medium shadow-md  hover:shadow-xl focus:bg-gray-800 focus:text-white ">
          SIGN UP
        </button>
      </section>
    </>
  );
};

const Main = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="h-screen flex justify-center items-center font-sans bg-red-100">
      <div className="sm:w-9/12 h-3/4 md:w-3/4 lg:w-4/12 text-black shadow-2xl bg-pink-400">
        <AuthNav setlogin={setLogin} />
        {login ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default Main;
