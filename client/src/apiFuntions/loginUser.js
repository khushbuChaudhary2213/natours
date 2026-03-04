import api from "../utils/axios";

const loginUser = async (formData) => {
  try {
    const res = await api.post("/users/login", {
      email: formData.email,
      password: formData.password,
    });

    return res;
  } catch (err) {
    if (err.response.status === 401) {
      // console.log(err.response.data.message);
      throw new Error(err.response.data.message);
    }

    throw new Error(`Error 💥: ${err}`);
  }
};

export default loginUser;
