import React from "react";

import { Fileuploadcomponent } from "./fileuploadcomponent";
import { Recipientsform } from "./recipientsform";


export const Recipient = () => {
  return (
    <section className="  rounded-2xl  p-2 h-full flex flex-col">
      <article className="w-full row-span-2 ">
        <Fileuploadcomponent />
      </article>

      <article className="pt-2">
        <Recipientsform />
      </article>
    </section>
  );
};

//Drag and drop to add recipients
// Manual form to add recipients
//A table to see the recipients
//Buttons to delete a recipient or edit their data
// View a recipients current balance
