import { useDropzone } from "react-dropzone";
import { useMemo, useCallback, useContext } from "react";
import XLSX from "xlsx";
import parsePhoneNumber from "libphonenumber-js";
import { Appcontext } from "../AppContext";
import axios from "axios";

const mystyles = {
  baseStyles:
    "w-full border-4 border-dashed outline-none rounded-lg h-20 transition duration-500 flex justify-center items-center text-gray-500",
  acceptStyle: " border-green-500 ",
  rejectStyle: " border-red-600 ",
};

export const Fileuploadcomponent = () => {
  const {
    setAppError,
    apperror,
    setAppNotification,
    appnotification,
  } = useContext(Appcontext);

  const submittoserver = useCallback(
    async (data) => {
      try {
        let result = await axios.post(
          `${process.env.REACT_APP_SERVER}/addrecipients`,
          data,
          {
            withCredentials: true,
          }
        );
        if (result.status === 200) {
          setAppNotification({
            ...appnotification,
            message: "Success",
          });
        }
      } catch (error) {
        setAppError({
          ...apperror,
          color: "bg-red-500",
          errormessage: `${error.response.data}`,
        });
        console.log(error.response.data);
      }
    },
    [apperror, appnotification, setAppError, setAppNotification]
  );

  const {
    // acceptedFiles,
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept:
      " application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //
    onDrop: useCallback(
      async (acceptedFiles) => {
        acceptedFiles.forEach((file) => {
          const reader = new FileReader();
          reader.onerror = () => console.log("error occured");
          reader.onabort = () => console.log("abort error");
          reader.onload = () => {
            const data = new Uint8Array(reader.result);
            const workbook = XLSX.read(data, { type: "array" });
            console.log(workbook.SheetNames);

            const firstsheetname = workbook.SheetNames[0];
            let worksheet = workbook.Sheets[firstsheetname];
            let sheetdata = XLSX.utils.sheet_to_json(worksheet);

            try {
              // Check if sheet is empty
              if (Array.isArray(sheetdata) && !sheetdata.length) {
                // if empty throw error
                throw new Error("Excel file is empty");
              } else if (Array.isArray(sheetdata) && sheetdata.length) {
                //if not empty check if titles are present
                console.log("Here is your data", sheetdata);

                let arrayofid = [];
                let arrayofmobilenumbers = [];
                let mobilenumberdictionary;
                let iddictionary;
                // let tobeverifiedtbyserver = [];

                //to be done for each record in the sheet
                sheetdata.forEach((entry) => {
                  const hascorrectkeys = Object.keys(entry)
                    .map((entrytitle) => entrytitle.toLowerCase())
                    .includes(
                      "firstname" && "lastname" && "idnumber" && "mobilenumber"
                    );

                  if (hascorrectkeys) {
                    // if all titles are present create object of these values and add to array of values to send

                    // addnumber to array of numbers
                    arrayofmobilenumbers = [
                      ...arrayofmobilenumbers,
                      entry.mobilenumber,
                    ];
                    arrayofid = [...arrayofid, entry.idnumber];
                  } else {
                    // if missing a title throw an error

                    throw new Error(
                      "Please Check if you have a firstname,lastname,idnumber and mobilenumber columns in your excel file and all cells have data"
                    );
                  }
                });
                // create a dictionary of ids and mobile numbers

                const dictionarymobile = (accumulator, mobilenumber) => ({
                  ...accumulator,
                  [mobilenumber]: (accumulator[mobilenumber] || 0) + 1,
                });
                const dictionaryid = (accumulator, idnumber) => ({
                  ...accumulator,
                  [idnumber]: (accumulator[idnumber] || 0) + 1,
                });
                // An object with all mobilenumbers and the number of instances of each mobile number
                mobilenumberdictionary = arrayofmobilenumbers.reduce(
                  dictionarymobile,
                  {}
                );
                iddictionary = arrayofid.reduce(dictionaryid, {});

                const duplicatemobilenumbers = () => {
                  return Object.keys(mobilenumberdictionary).filter(
                    (value) => mobilenumberdictionary[value] > 1
                  );
                };
                const duplicateids = () => {
                  return Object.keys(iddictionary).filter(
                    (value) => iddictionary[value] > 1
                  );
                };

                const idduplicates = duplicateids();
                const mobilenumberduplicates = duplicatemobilenumbers();

                // checks if there are any duplicates by checking array length

                if (idduplicates.length || mobilenumberduplicates.length) {
                  let myerror = idduplicates
                    ? `Duplicate Id: ${idduplicates} `
                    : "";

                  let mobileerror = mobilenumberduplicates
                    ? ` Duplicate mobilenumbers: ${mobilenumberduplicates}`
                    : "";

                  throw new Error(myerror + mobileerror);
                }
                //check if a mobilenumber has a length of ten
                let numberslessthanten = sheetdata.reduce(
                  (accumulator, current) => {
                    if (
                      !parsePhoneNumber(
                        current.mobilenumber.toString(),
                        "KE"
                      ).isValid()
                    ) {
                      return [
                        ...accumulator,
                        {
                          mobilenumber: current.mobilenumber,
                          rownum: current.__rowNum__,
                        },
                      ];
                    } else {
                      return accumulator;
                    }
                  },
                  []
                );

                let idnumberslessthanten = sheetdata.reduce(
                  (accumulator, current) => {
                    if (
                      current.idnumber.toString().length < 7 ||
                      current.idnumber.toString().length > 8
                    ) {
                      return [
                        ...accumulator,
                        {
                          idnumber: current.idnumber,
                          rownum: current.__rowNum__,
                        },
                      ];
                    } else {
                      return accumulator;
                    }
                  },
                  []
                );
                console.log(`id numbers less than ten:`, idnumberslessthanten);
                if (
                  numberslessthanten?.length ||
                  idnumberslessthanten?.length
                ) {
                  let mynumberslessthanten = [
                    ...numberslessthanten,
                    ...idnumberslessthanten,
                  ];
                  console.log(mynumberslessthanten);

                  let myerror = mynumberslessthanten.reduce(
                    (accumulator, lessthanten) => {
                      let numberslessthantenerror = Object.keys(
                        lessthanten
                      ).includes("mobilenumber")
                        ? "The mobile number " +
                          lessthanten.mobilenumber +
                          " at row " +
                          lessthanten.rownum +
                          " is not a valid mobile number\n"
                        : "The id number " +
                          lessthanten.idnumber +
                          " at row " +
                          lessthanten.rownum +
                          " is not a valid id number\n";
                      return [...accumulator, numberslessthantenerror];
                    },
                    []
                  );

                  let newmyerror = myerror.reduce(
                    (accumulator, currentvalue) => {
                      return accumulator.concat(currentvalue);
                    },
                    ""
                  );

                  throw new Error(newmyerror);
                } else {
                  submittoserver(sheetdata);

                  // console.log("file is ok to send to server", sheetdata);
                }
              } else {
                console.log("error occured");
                throw new Error("Error Occurred");
              }
            } catch (error) {
              console.log(error.message);
              setAppError({
                ...apperror,
                color: "bg-red-500",
                textcolor: "text-white",
                errormessage: error.message,
              });
            }
          };
          reader.readAsArrayBuffer(file);
        });
      },
      [setAppError, apperror, submittoserver]
    ),
    maxFiles: 1,
  });

  const style = useMemo(() => {
    if (isDragAccept) {
      return mystyles.baseStyles.concat(mystyles.acceptStyle);
    } else if (isDragReject) {
      return mystyles.baseStyles.concat(mystyles.rejectStyle);
    } else {
      return mystyles.baseStyles;
    }
  }, [isDragAccept, isDragReject]);

  return (
    <div className=" flex flex-col ">
      <div {...getRootProps({ className: style })}>
        <input {...getInputProps()} />
        <div className="flex flex-col text-center text-lg">
          <p>Drag and drop your recipients excel file or click to add</p>
          <p>maximum of 1 excel file and 1 sheet</p>
        </div>
      </div>
    </div>
  );
};
