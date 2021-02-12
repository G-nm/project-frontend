import React from "react";

import { RequestTokenform } from "./RequestTokenform";
import { TokenForm } from "./TokenForm";

export const Transactions = () => {
  return (
    <div>
      <section>
        <div className="text-center text-lg font-medium underline">
          Purchase
        </div>
        <RequestTokenform />
        <hr />
      </section>
      <section>
        <TokenForm />
      </section>
    </div>
  );
};
