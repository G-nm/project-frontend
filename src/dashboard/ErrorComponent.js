import React from "react";

import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { removeError } from "../features/errors/errorSlice";
function ErrorComponent() {
  const dispatch = useDispatch();

  const clickClose = (id) => {
    dispatch(removeError(id));
  };
  const { errors } = useSelector((state) => state.errors);
  // console.log(errors);
  return (
    <section className="w-full absolute flex justify-center">
      {errors?.length > 0 &&
        errors.map(({ errormessage, id }) => {
          console.log(errormessage);
          return (
            <article
              key={id}
              className="bg-red-500 rounded-xl z-30 w-1/4  absolute text-center text-white flex content-around p-2 "
            >
              <span className="flex-grow">{errormessage}</span>
              <span className="">
                <IoCloseCircleOutline
                  className=" text-black text-2xl"
                  onClick={() => clickClose(id)}
                />
              </span>
            </article>
          );
        })}
    </section>
  );
}

export default ErrorComponent;
