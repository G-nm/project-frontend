import { useDropzone } from "react-dropzone";
import { useMemo, useCallback } from "react";
import XLSX from "xlsx";

const mystyles = {
  baseStyles:
    "w-full border-4 border-dashed outline-none rounded-lg h-20 transition duration-500 flex justify-center items-center text-gray-500",
  acceptStyle: " border-green-500 ",
  rejectStyle: " border-red-600 ",
};

export const Fileuploadcomponent = () => {
  const {
    acceptedFiles,
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept:
      " application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //
    onDrop: useCallback((acceptedFiles) => {
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

              let array0fid = [];
              let arrayofmobilenumbers = [];
              let mobilenumberdictionary;
              let iddictionary;

              sheetdata.forEach((entry) => {
                const titles = Object.keys(entry).map((entry) =>
                  entry.toLowerCase()
                );
                // checks for required titles for each object
                let hascorrectkeys = titles.includes(
                  "firstname" && "lastname" && "idnumber" && "mobilenumber"
                );
                if (hascorrectkeys) {
                  // if all titles are present create object of these values and add to array of values to send

                  // addnumber to array of numbers
                  arrayofmobilenumbers = [
                    ...arrayofmobilenumbers,
                    entry.mobilenumber,
                  ];
                  array0fid = [...array0fid, entry.idnumber];

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
                  iddictionary = array0fid.reduce(dictionaryid, {});
                } else {
                  // if missing a title throw an error
                  throw new Error(
                    "Please Check if you have a firstname,lastname,idnumber and mobilenumber columns in your excel file"
                  );
                }
              });
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

              if (idduplicates.length || mobilenumberduplicates.length) {
                let myerror = idduplicates
                  ? `Duplicate Id: ${idduplicates} `
                  : "";

                let mobileerror = mobilenumberduplicates
                  ? ` Duplicate mobilenumbers: ${mobilenumberduplicates}`
                  : "";

                throw new Error(myerror + mobileerror);
              }
              console.log("file is ok to send to server", sheetdata);
            } else {
              console.log("error occured");
              throw new Error("Error Occurred");
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        reader.readAsArrayBuffer(file);
      });
    }, []),
    maxFiles: 1,
  });
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

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
      <div>{files}</div>
      <div>Processing</div>
    </div>
  );
};
