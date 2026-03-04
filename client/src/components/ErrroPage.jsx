import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <main className="main">
      <div className="error">
        <div className="error__title">
          <h2 className="heading-secondary heading-secondary--error">
            Uh oh! Something went wrong!
          </h2>
          <h2 className="error__emoji">😢 🤯</h2>
        </div>
        <div className="error__msg"> Page not found!</div>
        <Link to="/" className="error__btn error__msg">
          Go Back Home
        </Link>
      </div>
    </main>
  );
}

export default ErrorPage;
