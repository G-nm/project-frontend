import React, { useState} from "react";


import { MerchantComponent } from "./Merchantsignup";
import { OrganisationSignup } from "./OrganisationSignup";
const Signup = () => {
  
  const [role, setRole] = useState("Organisation");

  // two components one for merchant one for organisation
  // on click sign up component gets it's data
  const showMerchant = () => {
    setRole("Merchant");
  };
  const showOrganisation = () => {
    setRole("Organisation");
  };

  return (
    <>
      <section className="">
        {role === "Organisation" ? (
          <OrganisationSignup showMerchant={showMerchant} />
        ) : (
          <MerchantComponent showOrganisation={showOrganisation} />
        )}
      </section>
    </>
  );
};

export default Signup;
