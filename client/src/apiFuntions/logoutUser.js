import api from "../utils/axios";

const logoutUser = async () => {
  try {
    const res = await api.get("/users/logout");
    // console.log(res);
    return res;
  } catch (err) {
    throw new Error(`Error : ${err}`);
  }
};

export default logoutUser;
