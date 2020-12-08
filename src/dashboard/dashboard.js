import React from "react";

import auth from "../auth/authservice";

const Dashboard = (props) => {
  return (
    <div>
      wowoo
      <button
        onClick={() => {
          auth.logout(() => {
            props.history.push("/");
          });
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default Dashboard;
