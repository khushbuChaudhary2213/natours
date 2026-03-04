import api from "../utils/axios";

const updateSettings = async (formData, type) => {
  // console.log(formData);
  try {
    const url =
      type === "password" ? "/users/updateMyPassword" : "/users/updateMe";
    const res = await api.patch(url, formData);

    return res;
  } catch (err) {
    if (err.response.status === 500) {
      // console.log(err.response.data.message);
      if (err.response.data.message.startsWith("Password "))
        throw new Error(err.response.data.message);
      else throw new Error(err.response.data.message.split(":")[2]);
    }

    throw new Error(`Error 💥: ${err}`);
  }
};

export default updateSettings;
