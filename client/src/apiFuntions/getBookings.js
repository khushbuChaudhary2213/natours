import api from "../utils/axios";

const getBookings = async () => {
  try {
    const res = await api.get("/tours/my-tours");
    console.log(res.data);
    return res.data.data;
  } catch (err) {
    if (err.response?.status === 401) {
      throw new Error("Error fetching current bookings!");
    }
    return err;
  }
};

export default getBookings;
