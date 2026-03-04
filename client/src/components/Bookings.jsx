import { useEffect, useState } from "react";
import getBookings from "../apiFuntions/getBookings";
import TourCard from "./TourCard";

function Bookings() {
  const [tours, setTours] = useState([]);
  useEffect(() => {
    try {
      const fetchBookings = async () => {
        const bookings = await getBookings();
        // console.log(res.data);
        setTours(bookings);
      };
      fetchBookings();
    } catch (err) {
      console.log(err);
    }
  }, []);

  console.log(tours);
  return (
    <div className="main">
      <div className="card-container">
        {tours?.map((tour) => (
          <TourCard tour={tour} />
        ))}
      </div>
    </div>
  );
}

export default Bookings;
