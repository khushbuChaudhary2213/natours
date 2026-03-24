import { useNavigate } from "react-router-dom";
import logoutUser from "../apiFuntions/logoutUser";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const res = await logoutUser();
      if (res.status === 200) {
        setUser(null);
        navigate("/login", { replace: true });
      }
    } catch (err) {
      alert(err.response.data.message);
      console.log(err.response.data.message);
    }
  }

  return (
    <header className="header">
      <nav className="nav nav--tours">
        <a className="nav__el" href="/">
          All Tours
        </a>
      </nav>
      <div className="header__logo">
        <img src="/img/logo-white.png" alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        {user ? (
          <>
            <a
              className="nav__el nav__el--logout"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              Log Out
            </a>
            <a href="/me" className="nav__el">
              <img
                src={`${process.env.REACT_APP_API_URL}/img/users/${user.photo}`}
                alt={`${user.name}`}
                className="nav__user-img"
              />
              <span>{user.name.split(" ")[0]}</span>
            </a>
          </>
        ) : (
          <>
            <a href="/login" className="nav__el">
              Log in
            </a>
            <a href="#" className="nav__el nav__el--cta">
              Sign Up
            </a>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
