// import { createContext, useContext, useReducer } from "react";
// // import { errorreducer } from "./reducers";

// const Appcontext = createContext();

// const ContextProvider = ({ children }) => {
//   //   console.log(children);
//   const initialerrorstate = {
//     errormessage: "",
//     color: "bg-red-500 ",
//     textcolor: "text-white ",
//   };
//   const orgdetails = { balance: 100 };
//   //   change color to frontend

//   const [apperror, dispatchapperror] = useReducer(
//     errorreducer,
//     initialerrorstate
//   );
//   const showError = (message) => {
//     dispatchapperror({ type: "SHOW_ERROR", payload: message });
//   };
//   const removeError = () => {
//     dispatchapperror({ type: "REMOVE_ERROR" });
//   };

//   let text = "from context";
//   return (
//     <Appcontext.Provider
//       value={{ ...apperror, showError, removeError, text, orgdetails }}
//     >
//       {children}
//     </Appcontext.Provider>
//   );
// };

// const useAppContext = () => {
//   return useContext(Appcontext);
// };

// export { ContextProvider, useAppContext, Appcontext };
