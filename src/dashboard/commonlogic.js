import axios from "axios";

export const validatemobilenumber = async (value) => {
  try {
    const ismobilenumberused = await axios.post(
      `${process.env.REACT_APP_SERVER}/checkmobilenumber`,
      {
        mobilenumber: value,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (ismobilenumberused.data.ismobilenumberpresent === 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const validateidnumber = async (value) => {
  try {
    let isidnumberused = await axios.post(
      `${process.env.REACT_APP_SERVER}/checkid`,
      {
        idnumber: value,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (isidnumberused.data.isidpresent === 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const requestorgdata = async (success, failure) => {
  let orgdetails;
  try {
    orgdetails = await axios.post(
      `${process.env.REACT_APP_SERVER}/orgdetails`,
      {},
      {
        withCredentials: true,
      }
    );
    success(orgdetails?.data);
  } catch (error) {
    failure(error.response?.data);
  }
  // console.log(orgdetails);
};
export const requestrecipientdata = async (success, failure) => {
  let requestedrecipients;
  try {
    requestedrecipients = await axios.post(
      `${process.env.REACT_APP_SERVER}/selectrecipientsfororg`,
      {},
      { withCredentials: true }
    );
    success(requestedrecipients?.data);
  } catch (error) {
    failure(error.response?.data);
  }
};
