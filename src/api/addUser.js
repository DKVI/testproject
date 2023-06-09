/** @format */

import axios from "../axios";
const addUser = (formData) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/users",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          ...formData,
        },
      });
      resolve(response);
    } catch {
      reject("ERROR");
    }
  });

export default addUser;
