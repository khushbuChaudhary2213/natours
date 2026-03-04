import api from "../utils/axios";

const getAllTours = async () => {
  try {
    const res = await api.get("/tours");
    // console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    console.log("ERROR", err);
  }
};

export default getAllTours;
