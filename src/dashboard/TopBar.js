import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAsyncOrgDetails } from "../features/organisations/orgSlice";
import { FiExternalLink } from "react-icons/fi";

export const TopBar = () => {
  // const { balance } = useSelector(requestdetails);
  let { balance, orgname, address } = useSelector(
    (state) => state.organisation
  );

  const dispatch = useDispatch();

  const status = useSelector((state) => state.organisation.status);

  const { loggedin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === "idle" && loggedin) {
      dispatch(getAsyncOrgDetails());
    }
  }, [dispatch, status, loggedin]);

  return (
    <div className=" shadow sticky top-3 z-10  rounded-2xl flex p-3 justify-end bg-white">
      <div className="pr-4 flex  w-full ">
        <span className="flex-grow">
          <span className="font-bold">Organisation name:</span> {orgname}
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
