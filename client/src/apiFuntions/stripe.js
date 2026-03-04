import { loadStripe } from "@stripe/stripe-js";
import api from "../utils/axios";
// const stripePromise = loadStripe(
//   "pk_test_51OGktxSI48lwXM9tGGglPAJtUCiNtmSndE5Do6UPNXQUxmoGdV4iZvQzCkQJc8wBuoXBRUvCVQFkwxUPeLvLcIk900ZTOKh6af",
// );

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await api.get(`/bookings/checkout-session/${tourId}`);
    return session;
  } catch (err) {
    throw new Error(err);
  }
};
