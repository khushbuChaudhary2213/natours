function ReviewCard({ review }) {
  return (
    <div className="reviews__card">
      {/* Avatar and user name */}
      <div className="reviews__avatar">
        <img
          className="reviews__avatar-img"
          src={`${process.env.REACT_APP_API_URL}/img/users/${review.user.photo}`}
          alt={review.user.name}
        />
        <h6 className="reviews__user">{review.user.name}</h6>
      </div>

      {/* Review text */}
      <p className="reviews__text">{review.review}</p>

      {/* Rating stars */}
      <div className="reviews__rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`reviews__star reviews__star--${
              review.rating >= star ? "active" : "inactive"
            }`}
          >
            <use xlinkHref="/img/icons.svg#icon-star" />
          </svg>
        ))}
      </div>
    </div>
  );
}

export default ReviewCard;
