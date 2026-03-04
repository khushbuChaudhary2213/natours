import TourCard from "./TourCard";

function Overview({ tours }) {
  // console.log(tours);
  return (
    <main className="main">
      <div className="card-container">
        {tours?.map((tour) => (
          <TourCard tour={tour} />
        ))}
      </div>
    </main>
  );
}

export default Overview;
