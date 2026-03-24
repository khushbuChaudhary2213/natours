import { useEffect } from "react";
import getTour from "../apiFuntions/getTour";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ReviewCard from "./ReviewCard";
import ErrorPage from "./ErrroPage";
import { bookTour } from "../apiFuntions/stripe";

function OverviewBox({ label, text, icon }) {
  return (
    <div className="overview-box__detail">
      <svg className="overview-box__icon">
        <use xlinkHref={`/img/icons.svg#icon-${icon}`} />
      </svg>
      <span className="overview-box__label">{label}</span>
      <span className="overview-box__text">{text}</span>
    </div>
  );
}

function Tour() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { slug } = useParams();
  const [tour, setTour] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tour = await getTour(slug);
        // console.log(tour);
        if (!tour) {
          setError(true);
        } else {
          setTour(tour);
        }
        if (tour) {
          document.title = `Natours | ${tour.name} `;
        }
      } catch (err) {
        setError(true);
        // console.log(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  async function handleBooking(e) {
    e.preventDefault();
    try {
      const res = await bookTour(tour.id);
      // console.log(res.data);

      navigate(res.data.session.url);
    } catch (err) {
      console.log("🫂", err);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorPage />;

  return (
    <>
      <div>
        <section className="section-header">
          <div className="header__hero">
            <div className="header__hero-overlay">&nbsp;</div>
            <img
              src={`${process.env.REACT_APP_API_URL}/img/tours/${tour.imageCover}`}
              alt={`${tour.name}`}
              className="header__hero-img"
            />
          </div>

          <div className="heading-box">
            <h1 className="heading-primary">
              <span>{tour.name} tour</span>
            </h1>
            <div className="heading-box__group">
              <div className="heading-box__detail">
                <svg className="heading-box__icon">
                  <use xlinkHref="/img/icons.svg#icon-clock" />
                </svg>
                <span className="heading-box__text">{tour.duration} days</span>
              </div>
              <div className="heading-box__detail">
                <svg className="heading-box__icon">
                  <use xlinkHref="/img/icons.svg#icon-map-pin" />
                </svg>
                <span className="heading-box__text">
                  {tour.startLocation?.description}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-description">
          <div className="overview-box">
            <div>
              <div className="overview-box__group">
                <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
                {tour && tour.startDates && tour.startDates.length > 0 && (
                  <OverviewBox
                    label="Next Date"
                    text={new Date(tour.startDates[0]).toLocaleString("en-us", {
                      month: "long",
                      year: "numeric",
                    })}
                    icon="calendar"
                  />
                )}
                <OverviewBox
                  label="Difficulty"
                  text={tour.difficulty}
                  icon="trending-up"
                />
                <OverviewBox
                  label="Participants"
                  text={`${tour.maxGroupSize} people`}
                  icon="user"
                />
                <OverviewBox
                  label="Rating"
                  text={`${tour.ratingsAverage} / ${tour.ratingsQuantity}`}
                  icon="star"
                />
              </div>

              <div className="overview-box__group">
                <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
                {tour.guides?.map((guide) => {
                  return (
                    <div className="overview-box__detail">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/img/users/${guide.photo}`}
                        alt={guide.name}
                        className="overview-box__img"
                      />
                      {guide.role === "lead-guide" && (
                        <span className="overview-box__label">Lead guide</span>
                      )}
                      {guide.role === "guide" && (
                        <span className="overview-box__label">Lead guide</span>
                      )}
                      <span className="overview-box__text">{guide.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="description-box">
            <h2 className="heading-secondary ma-bt-lg">
              About {tour.name} tour
            </h2>
            {tour.description?.split("\n").map((para) => {
              return <p className="description__text">{para}</p>;
            })}
          </div>
        </section>

        <section className="section-pictures">
          {tour.images?.map((img, i) => {
            return (
              <div className="picture-box">
                <img
                  src={`${process.env.REACT_APP_API_URL}/img/tours/${img}`}
                  alt={`The Park Camper Tour ${i + 1}`}
                  className={`picture-box__img picture-box__img--${i + 1}`}
                />
              </div>
            );
          })}
        </section>

        {/* <section className="section-map">
          <div id="map" data-locations={JSON.stringify(tour.locations)}>
            <div
              className="mapboxgl-popup"
              style={{ padding: "25rem", fontSize: "8rem" }}
            >
              Map
            </div>
          </div>
        </section> */}

        <section className="section-reviews">
          <div className="reviews">
            {tour.reviews?.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        </section>

        <section className="section-cta">
          <div className="cta">
            <div className="cta__img cta__img--logo">
              <img src="/img/logo-white.png" alt="Natours logo" />
            </div>
            {tour.images && (
              <>
                <img
                  className="cta__img cta__img--1"
                  src={`${process.env.REACT_APP_API_URL}/img/tours/${tour.images[1]}`}
                  alt="Tour  1"
                />
                <img
                  className="cta__img cta__img--2"
                  src={`${process.env.REACT_APP_API_URL}/img/tours/${tour.images[2]}`}
                  alt="Tour 2"
                />
              </>
            )}
            <div className="cta__content">
              <h2 className="heading-secondary">What are you waiting for?</h2>
              <p className="cta__text">
                {tour.duration} days. 1 adventure. Infinite memories. Make it
                yours today!
              </p>
              {user ? (
                <button
                  className="btn btn--green span-all-rows"
                  onClick={handleBooking}
                >
                  Book tour now!
                </button>
              ) : (
                <a href="/login" className="btn btn--green span-all-rows">
                  Log in to book tour
                </a>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Tour;
