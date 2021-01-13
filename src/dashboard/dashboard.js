import React, { useRef, useState, useEffect } from "react";
import {
  Switch,
  Redirect,
  Route,
  useRouteMatch,
  NavLink,
} from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BiLogOutCircle } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { RecipientModal } from "./recipients/RecipientModal";
import auth from "../auth/authservice";
import { ProtectedRoute } from "../auth/protected.route";
import { Home } from "./home";
import { Recipient } from "./recipients";
import { Merchant } from "./merchants";
import { PaymentModal } from "./deposit/PaymentModal";
import Deposit from "./deposit";
import { Appcontext } from "./AppContext";
import { Transfer } from "./transfer";
import { requestorgdata, requestrecipientdata } from "./commonlogic";
require("dotenv").config();
const stripPromise = loadStripe(
  "pk_test_51I3gNIDsnRyoDmtJCrLBhlJX0PFNaFXNz8DHG90sOEl4Vv44lumjcQ9KDY6qdjVuwufFbUoc6J1dcpytArfRnM0k00IeDw03Rb"
);

const myroutes = [
  {
    path: "/dash/home",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/dash/recipients",
    exact: true,
    main: () => <Recipient />,
  },
  {
    path: "/dash/merchants",
    exact: true,
    main: () => <Merchant />,
  },
  {
    path: "/dash/deposit",
    exact: true,
    main: () => <Deposit />,
  },
  {
    path: "/dash/transfer",
    exact: true,
    main: () => <Transfer />,
  },
];

// Add use effect and add state as dependency
// In use effect change notification bar opacity

export const Dashboard = (props) => {
  const notificationbar = useRef();
  const successnotification = useRef();
  const [apperror, setAppError] = useState({
    errormessage: "",
    color: "bg-red-500 ",
    textcolor: "text-white ",
  });
  const [userdetails, setUserDetails] = useState({
    showuserdetails: false,
    firstname: "",
    lastname: "",
    idnumber: "",
    mobilenumber: "",
    balance: "",
    uuid: "",
  });
  const [payment, setPayment] = useState({
    showpayment: false,
    paymentname: "",
    price: "",
  });
  const [recipients, setRecipients] = useState([]);
  const [shouldrequestrecipients, setRequestRecipients] = useState(true);
  const [orgdetails, setOrgDetails] = useState({});

  useEffect(() => {
    let requestrecipients = async (success, failure) => {
      await requestrecipientdata(success, failure);
    };

    const ifsuccess = (recipientdetails) => {
      console.log(recipientdetails);
      setRecipients(recipientdetails);
    };

    const iffailure = (error) => {
      setAppError({
        color: "bg-red-500 ",
        textcolor: "text-white ",
        errormessage: error,
      });
    };

    requestrecipients(ifsuccess, iffailure);
  }, [shouldrequestrecipients]);

  const [appnotification, setAppNotification] = useState({
    message: "",
  });

  let { url } = useRouteMatch();

  const styles = {
    activelink: "block bg-yellow-300 rounded mx-4 ",
    link: "block mx-4 py-1",
  };
  const addstyle = () => {
    notificationbar.current.classList.add("-translate-y-full");
    setTimeout(() => {
      setAppError({ ...apperror, errormessage: "" });
    }, 500);
  };

  if (apperror.errormessage?.length) {
    notificationbar.current.classList.remove("-translate-y-full");
  }
  // Show Success Notification
  useEffect(() => {
    if (appnotification.message.length) {
      successnotification.current.classList.remove("-translate-x-full");
      setTimeout(() => {
        successnotification.current.classList.add("-translate-x-full");
      }, 4000);
      setTimeout(() => {
        setAppNotification({ message: "" });
      }, 5000);
    }
  }, [appnotification.message]);

  useEffect(() => {
    let data = async (successcb, failurecb) => {
      await requestorgdata(successcb, failurecb);
    };

    const ifsuccess = (orgdetails) => {
      console.log(orgdetails);
      setOrgDetails(orgdetails);
    };

    const iffailure = (error) => {
      setAppError({
        color: "bg-red-500 ",
        textcolor: "text-white ",
        errormessage: error,
      });
    };
    data(ifsuccess, iffailure);
  }, []);

  let mytext = "wowowowo";
  return (
    <Appcontext.Provider
      value={{
        mytext,
        setAppError,
        apperror,
        setAppNotification,
        appnotification,
        recipients,
        userdetails,
        setUserDetails,
        payment,
        setPayment,
        setRequestRecipients,
        shouldrequestrecipients,
        orgdetails,
      }}
    >
      <RecipientModal />

      <Elements stripe={stripPromise}>
        <PaymentModal />
      </Elements>

      <div
        className={`h-screen bg-gray-50 ${
          userdetails.showuserdetails ? `overflow-hidden` : `overflow-auto`
        }`}
      >
        <div
          className="absolute z-20 w-full flex justify-center transform-gpu transition-all duration-500 -translate-y-full"
          ref={notificationbar}
        >
          <div
            className={`${apperror.color} mx-96 p-7 rounded-xl  ${apperror.textcolor} relative`}
          >
            {apperror.errormessage}

            <button
              onClick={addstyle}
              className="absolute right-5 top-2 text-xl text-black outline-none"
            >
              <AiOutlineCloseCircle />
            </button>
          </div>
        </div>
        <div
          className="z-20 absolute bottom-32 p-4 -translate-x-full bg-green-300 rounded-lg w-80 h-14 flex items-center transform-gpu transition-all duration-700"
          ref={successnotification}
        >
          <span className="pr-5 flex-grow">{appnotification.message}</span>
          <span className="">
            <IoCheckmarkDoneSharp />
          </span>
        </div>

        <div className=" rounded-2xl w-72  ml-4  bg-white fixed h-full">
          <div className="relative top-2 mb-2 h-full  pt-8 rounded border">
            <div className="text-5xl pb-5 font-semibold text-center">MTOG</div>
            <div className="flex flex-col gap-2 text-center">
              <div>
                <NavLink
                  to={`${url}/home`}
                  activeClassName={styles.activelink}
                  className={styles.link}
                >
                  Dashboard
                </NavLink>
              </div>
              <div>
                <NavLink
                  to={`${url}/recipients`}
                  activeClassName={styles.activelink}
                  className={styles.link}
                >
                  Recipients
                </NavLink>
              </div>

              <div>
                <NavLink
                  to={`${url}/merchants`}
                  activeClassName={styles.activelink}
                  className={styles.link}
                >
                  Merchants
                </NavLink>
              </div>
              <div>
                <NavLink
                  to={`${url}/deposit`}
                  activeClassName={styles.activelink}
                  className={styles.link}
                >
                  Deposit
                </NavLink>
              </div>
              <div>
                <NavLink
                  to={`${url}/transfer`}
                  activeClassName={styles.activelink}
                  className={styles.link}
                >
                  Transfer
                </NavLink>
              </div>
            </div>
            <div className=" absolute bottom-6  w-full  flex justify-center">
              <button
                className="py-1 rounded-lg border-2 w-full mx-4  hover:bg-red-500 hover:text-white z-0"
                onClick={() => {
                  auth.logout(() => {
                    props.history.push("/");
                  });
                }}
              >
                <BiLogOutCircle className="inline" />
                Sign out
              </button>
            </div>
          </div>
        </div>

        <div className=" ml-80  flex flex-col pr-5 relative h-full gap-10">
          <div className=" shadow sticky top-3 z-10  rounded-2xl flex p-3 justify-end bg-white">
            <div className="pr-4 self-center ">
              <span className="font-bold">Balance: </span>{" "}
              <span>{orgdetails?.balance?.toLocaleString()} </span>
              MTOG
            </div>
          </div>
          <div className=" bottom-4 relative rounded-2xl border bg-white w-full ">
            <Switch>
              {myroutes.map((route, index) => (
                <ProtectedRoute
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              ))}
              <Route path="*">
                <Redirect to="/dash/home" />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Appcontext.Provider>
  );
};

// export default Dashboard;
