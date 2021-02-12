import axios from "axios";
import React from "react";
import { AiOutlineShop } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setError } from "../../features/errors/errorSlice";
import { editorgmerchants } from "../../features/orgmerchants/orgmerchantSLice";
export const Merchantslist = ({ merchant }) => {
  const { name, storename, transactions, id } = merchant;

  const dispatch = useDispatch();
  const addmerchant = async () => {
    // This will make a reques to the server with the merchants id to be added to organisations list

    try {
      let results = await axios.post(
        `${process.env.REACT_APP_SERVER}/addmerchanttoorg`,
        {
          userid: id,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(editorgmerchants(results.data.userid));
    } catch (error) {
      dispatch(setError(Object.values(error.response.data)));
    }
  };

  return (
    <>
      <article className="relative w-64 h-52 flex-col rounded pt-2 shadow-md hover:shadow-lg border">
        <div className="w-16 h-16 bg-yellow-300 mx-auto rounded-full border flex justify-center items-center text-3xl">
          <AiOutlineShop />
        </div>
        <section className="pl-2">
          <article className=" my-1 ">
            Owner: <span className="float-right mr-2">{name}</span>
          </article>
          <article className=" mb-1 ">
            Store: <span className="float-right mr-2">{storename}</span>
          </article>
          <article className=" ">
            Transactions:{" "}
            <span className="float-right mr-2">{transactions}</span>
          </article>
        </section>
        <div className=" w-full h-16  absolute bottom-0 flex justify-center items-center">
          <button
            className="rounded w-20 h-8 bg-yellow-300 hover:bg-yellow-400"
            onClick={addmerchant}
          >
            Add
          </button>
        </div>
      </article>
    </>
  );
};
