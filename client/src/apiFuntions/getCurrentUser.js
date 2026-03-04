import api from "../utils/axios";

const getCurrentUser = async () => {
  try {
    const res = await api.get("/users/me");
    // console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    if (err.response?.status === 401) {
      throw new Error("Error fetching current user!");
    }
    return err;
  }
};

export default getCurrentUser;
