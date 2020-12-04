import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
const Signup = () => {
  const [eye, SetEye] = React.useState(false);

  const [role, setRole] = React.useState(true);

  return (
    <>
      <section>
        <div>
          <label htmlFor="role">Role</label>
          <br />
          <select
            name=""
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
              className="w-full h-9 pl-2 rounded outline-none border"
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
              className="w-full h-9 pl-2 rounded outline-none border"
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
            />
          </div>
        )}

        <div>
          <label htmlFor="email">Email:</label>

          <input
            type="email"
            id="email"
            className="w-full h-9 pl-2 rounded outline-none border"
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
            />
          </div>
        )}

        <button className="text-center w-full bg-yellow-300 text-black h-9 mt-5 rounded outline-none font-medium">
          Sign up
        </button>
      </section>
    </>
  );
};

export default Signup;
