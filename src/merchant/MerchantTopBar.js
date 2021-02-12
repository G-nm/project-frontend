import axios from "axios";
import React, { useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";

import { useSelector, useDispatch } from "react-redux";
import { setError } from "../features/errors/errorSlice";
import { setMerchant } from "../features/merchant/merchantSLice";

export const MerchantTopBar = () => {
  // const { balance } = useSelector(requestdetails);
  //   let balance = useSelector((state) => state.organisation.balance);
  const dispatch = useDispatch();

  useEffect(() => {
    const getmerchantdetails = async () => {
      try {
        
        const result = await axios.post(
          `${process.env.REACT_APP_SERVER}/merchantdetails`,
          {},
          {
            withCredentials: true,
          }
        );
        if (result.status === 200) {
          dispatch(setMerchant(result.data));
        }
      } catch (error) {
        dispatch(setError(Object.values(error.response.data).toString()));
      }
    };
    getmerchantdetails();
    // dispatch(getAsyncMerchantDetails());
  }, [dispatch]);

  const { merchantname, balance, address } = useSelector(
    (state) => state.merchant
  );

  return (
    <div className=" shadow sticky top-3 z-10  rounded-2xl flex p-3  bg-white">
      <div className="pr-4 flex  w-full ">
        <span className="flex-grow">
          <span className="font-bold">Storename:</span> {merchantname}
        </span>
        <span className="font-bold">
          Balance:{" "}
          <span className="font-normal">
            {balance?.toLocaleString()} MTOG{" "}
            <a
              href={`https://kovan.etherscan.io/address/${address}`}
              target="_blank"
              rel="noreferrer"
            >
              <FiExternalLink className="inline text-xl" />
            </a>
          </span>
        </span>
      </div>
    </div>
  );
};
