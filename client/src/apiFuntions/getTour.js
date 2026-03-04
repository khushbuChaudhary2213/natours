import api from "../utils/axios";

const getTour = async (slug) => {
  try {
    const res = await api.get(`/tours/view/${slug}`);
    // console.log(res);
    return res.data.data;
  } catch (err) {
    throw new Error("ERROR", err.response.data);
  }
};

export default getTour;
