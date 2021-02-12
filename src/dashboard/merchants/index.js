import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Merchantslist } from "./Merchantslist";
import { OrganisationMerchants } from "./OrganisationMerchants";
import { setError } from "../../features/errors/errorSlice";
import {
  setorgmerchants,
  setothermerchants,
} from "../../features/orgmerchants/orgmerchantSLice";

//  on component load dispatch action to get merchants for an organisation
// dispatch action for other merchants

export const Merchant = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const getorgmerchants = async () => {
      try {
        let results = await axios.post(
          `${process.env.REACT_APP_SERVER}/getmerchantsbyorg`,
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(results);
        dispatch(setorgmerchants(results.data));
      } catch (error) {
        dispatch(setError(Object.values(error.response.data).toString()));
      }
    };
    getorgmerchants();

    const getothermerchants = async () => {
      try {
        let results = await axios.post(
          `${process.env.REACT_APP_SERVER}/getothermerchants`,
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        dispatch(setothermerchants(results.data));
      } catch (error) {
        dispatch(setError(Object.values(error.response.data).toString()));
      }
    };
    getothermerchants();
  }, [dispatch]);
  const merchantsfororg = useSelector(
    (state) => state.orgmerchant.orgmerchants
  );
  // console.log(merchantsfororg);
  const othermerchants = useSelector(
    (state) => state.orgmerchant.othermerchants
  );

  return (
    <div className="flex flex-col">
      <section className=" border-b h-64 overflow-x-auto px-4 relative">
        <div className="text-center text-lg sticky top-0 z-10">
          Other Merchants
        </div>
        <div className="flex justify-center gap-10 flex-wrap">
          {othermerchants.length ? (
            othermerchants.map((merchant) => {
              return <Merchantslist key={merchant.id} merchant={merchant} />;
            })
          ) : (
            <>
              <div className="h-52  w-full text-center flex justify-center items-center">
                <div className="text-xl font-bold">No merchants found</div>
              </div>
            </>
          )}
        </div>
      </section>
      <section className="overflow-y-auto  px-4 h-80 relative">
        <div className="text-center text-lg sticky top-0 z-10">
          Your Merchants
        </div>
        <div className="flex justify-center gap-10 flex-wrap">
          {merchantsfororg.length ? (
            merchantsfororg.map((merchant) => (
              <OrganisationMerchants key={merchant.id} merchant={merchant} />
            ))
          ) : (
            <>
              <div className="h-52  w-full text-center flex justify-center items-center">
                <div className="text-xl font-bold">No merchants found</div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};
