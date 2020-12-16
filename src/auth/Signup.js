import React, { useState, useEffect, useContext } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ShowContext } from "./Showcontext";
import axios from "axios";
const Signup = () => {
  const [eye, SetEye] = React.useState(false);

  const { setShow, setErrorAlert } = useContext(ShowContext);
  const [role, setRole] = React.useState(true);

  const [organisation, setOrganisation] = useState({
    role: "organisation",
    name: "",
    email: "",
    pass: "",
    mobilenumber: "",
  });
  const [merchant, setMerchant] = useState({
    role: "merchant",
    firstname: "",
    lastname: "",
    storename: "",
    email: "",
    pass: "",
    mobilenumber: "",
    id: "",
  });

  useEffect(() => {
    if (role) {
      setMerchant({
        role: "merchant",
        firstname: "",
        lastname: "",
        storename: "",
        email: "",
        pass: "",
        mobilenumber: "",
        id: "",
      });
    } else {
      setOrganisation({
        role: "organisation",
        name: "",
        email: "",
        pass: "",
        mobilenumber: "",
      });
    }
  }, [role]);

  const onchangehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (role) {
      setOrganisation({ ...organisation, [name]: value });
    } else if (!role) {
      setMerchant({ ...merchant, [name]: value });
    }
  };

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    if (role) {
      try {
        let result = await axios.post("http://localhost:3636/signuporg", {
          ...organisation,
        });

        if (result.status === 200) {
          setOrganisation({
            role: "organisation",
            name: "",
            email: "",
            pass: "",
            mobilenumber: "",
          });
          setShow(false);
        }
      } catch (error) {
        console.log(error.response.data.error);
        // return error;
        setErrorAlert(error.response.data.error);
      }
    } else {
      try {
        let result = await axios.post("http://localhost:3636/signupmerchant", {
          ...merchant,
        });

        if (result.status === 200) {
          setMerchant({
            role: "merchant",
            firstname: "",
            lastname: "",
            storename: "",
            email: "",
            pass: "",
            mobilenumber: "",
            id: "",
          });
          setShow(false);
        }
      } catch (error) {
        console.log(error.response.status);
        // setErrorAlert(error.response.data.error);
        // return error;
      }
    }
  };

  return (
    <>
      <section>
        <div className="text-red-600"></div>
        <form onSubmit={onsubmitHandler}>
          <div>
            <label htmlFor="role">Role</label>
            <br />
            <select
              name="role"
              id="role"
              className="w-full h-9 pl-2 rounded outline-none border  bg-white"
              onChange={(e) => {
                if (e.target.value === "organisation") {
                  setRole(true);
                } else if (e.target.value === "merchant") {
                  setRole(false);
                }
              }}
            >
              <option value="organisation" className="outline-none">
                Organisation
              </option>
              <option value="merchant" className="outline-none">
                Merchant
              </option>
            </select>
          </div>

          {role && (
            <div>
              <label htmlFor="name">Organisation's Name</label>

              <input
                type="text"
                id="name"
                name="name"
                className="w-full h-9 pl-2 rounded outline-none border"
                required
                value={organisation.name}
                onChange={onchangehandler}
              />
            </div>
          )}
          {!role && (
            <div>
              <label htmlFor="firstname">First name</label>
              <br />
              <input
                type="text"
                id="firstname"
                name="firstname"
                className="w-full h-9 pl-2 rounded outline-none border"
                required
                onChange={onchangehandler}
                value={merchant.firstname}
              />
            </div>
          )}
          {!role && (
            <div>
              <label htmlFor="lastname">Last name</label>
              <br />
              <input
                type="text"
                id="lastname"
                className="w-full h-9 pl-2 rounded outline-none border"
                name="lastname"
                onChange={onchangehandler}
                value={merchant.lastname}
              />
            </div>
          )}
          {!role && (
            <div>
              <label htmlFor="Storename">Store name</label>
              <br />
              <input
                type="text"
                id="storename"
                className="w-full h-9 pl-2 rounded outline-none border"
                name="storename"
                onChange={onchangehandler}
                value={merchant.storename}
              />
            </div>
          )}

          <div>
            <label htmlFor="email">Email:</label>

            <input
              type="email"
              id="email"
              className="w-full h-9 pl-2 rounded outline-none border"
              required
              name="email"
              onChange={onchangehandler}
              value={role ? organisation.email : merchant.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div className="flex border rounded">
              <input
                type={eye ? "text" : "password"}
                id="pass"
                name="pass"
                className="w-full h-9 pl-2 rounded outline-none  col-span-2 "
                required
                onChange={onchangehandler}
                value={role ? organisation.pass : merchant.pass}
              />

              <span className="mt-2 text-xl">
                {eye ? (
                  <FiEye
                    className="  cursor-pointer "
                    onClick={() => {
                      SetEye(false);
                    }}
                  />
                ) : (
                  <FiEyeOff
                    className=" cursor-pointer"
                    onClick={() => {
                      SetEye(true);
                    }}
                  />
                )}
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="mobile">Mobile Number</label>
            <br />
            <input
              type="number"
              id="mobile"
              className="w-full h-9 pl-2 rounded outline-none border"
              required
              name="mobilenumber"
              onChange={onchangehandler}
              value={role ? organisation.mobilenumber : merchant.mobilenumber}
            />
          </div>

          {!role && (
            <div>
              <label htmlFor="id">Id</label>
              <br />
              <input
                type="number"
                id="id"
                className="w-full h-9 pl-2 rounded outline-none border"
                name="id"
                onChange={onchangehandler}
                value={merchant.id}
              />
            </div>
          )}

          <button
            className="text-center w-full bg-yellow-300 text-black h-9 mt-5 rounded outline-none font-medium"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </section>
    </>
  );
};

export default Signup;
