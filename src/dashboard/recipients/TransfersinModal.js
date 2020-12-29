import React from "react";

import { FaAngleDoubleRight } from "react-icons/fa";

export const TransfersinModal = () => {
  return (
    <>
      <div className="text-center font-bold text-2xl ">Transfers</div>
      <div className=" grid grid-cols-3 place-items-center">
        <div className="underline">From</div>
        <div className="   underline">Amount</div>
        <div className="  underline">To</div>
      </div>
      <div className="overflow-auto">
        <div className="pb-2 px-2 grid grid-cols-5 place-items-center  hover:bg-yellow-100">
          <span className="">George Mwaniki</span>
          <span className="">
            <FaAngleDoubleRight className="inline text-xl" />
          </span>
          <span className="">1000 MTOG</span>
          <span>
            <FaAngleDoubleRight className=" inline text-xl" />
          </span>
          <span className="items-end">Kamotho's General Shop</span>
        </div>
        {/* Two */}
        <div className="pb-2 px-2 grid grid-cols-5 place-items-center  hover:bg-yellow-100">
          <span className="">George Mwaniki</span>
          <span className="">
            <FaAngleDoubleRight className="inline text-xl" />
          </span>
          <span className="">1000 MTOG</span>
          <span>
            <FaAngleDoubleRight className=" inline text-xl" />
          </span>
          <span className="items-end">Kamotho's General Shop</span>
        </div>
      </div>
    </>
  );
};
