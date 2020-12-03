



function App() {
  return (
    <div className="h-screen flex justify-center items-center font-sans bg-red-100">
      <div className="sm:w-9/12 h-3/4 md:w-3/4 lg:w-4/12 text-black shadow-2xl bg-pink-400">
        <section className="w-full mb-10 ">
          <button
            type=""
            className=" active text-center w-1/2 h-20 text-3xl bg-white text-black font-medium shadow-md  hover:shadow-xl focus:bg-gray-800 focus:text-white "
          >
            LOG IN
          </button>
          <button className=" text-center w-1/2 h-20 text-3xl bg-white text-black font-medium shadow-md  hover:shadow-xl focus:bg-gray-800 focus:text-white ">
            SIGN UP
          </button>
        </section>
        <section className="px-12 ">
          <div className=" ">
            <label htmlFor="name" className="">
              Email
            </label>

            <input
              type="email"
              name="name"
              id="name"
              className="border-2 pl-1 py-4 text-black rounded-2xl w-full outline-none "
            />
          </div>
          <div className="mt-4">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="name"
              id="name"
              className="border-2 pl-1 py-4 text-black rounded-2xl w-full outline-none"
            />
          </div>
          <button className="w-full mt-10 bg-yellow-300 text-black rounded-2xl text-2xl py-4 font-semibold">
            Log in
          </button>
        </section>
      </div>
    </div>
  );
}

export default App;
