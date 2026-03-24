import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import updateSettings from "../apiFuntions/updateSettings";

function NavItem({ link, text, icon, active }) {
  return (
    <li className={active ? "side-nav--active" : ""}>
      <a href={link}>
        <svg>
          <use xlinkHref={`img/icons.svg#icon-${icon}`}></use>
        </svg>
        {text}
      </a>
    </li>
  );
}

const Account = () => {
  const { user } = useAuth();
  // console.log(user.photo);
  const [updatedUserData, setUpdatedUserData] = useState({
    name: user.name,
    email: user.email,
    photo: user.photo,
  });
  const [updatedUserPass, setUpdatedUserPass] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    document.title = `Natours | Your Account`;
  }, []);

  function handleDataChange(e) {
    setUpdatedUserData({
      ...updatedUserData,
      [e.target.name]: e.target.files ? e.target.files[0] : e.target.value,
    });
  }
  function handlePassChange(e) {
    setUpdatedUserPass({
      ...updatedUserPass,
      [e.target.name]: e.target.value,
    });
  }

  async function handleDataSubmit(e) {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", updatedUserData.name);
      form.append("email", updatedUserData.email);

      if (updatedUserData.photo) {
        form.append("photo", updatedUserData.photo);
      }
      const res = await updateSettings(form, "data");
      if (res.data.status === "success") alert("Data updated Successfully!");
      // console.log(res.data.data);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }
  async function handlePassSubmit(e) {
    e.preventDefault();
    try {
      const res = await updateSettings(updatedUserPass, "password");
      if (res.data.status === "success") {
        alert("Password updated Successfully!");
        setUpdatedUserPass({
          currentPassword: "",
          password: "",
          confirmPassword: "",
        });
      }
      // console.log(res.data.data);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }
  return (
    <main className="main">
      <div className="user-view">
        <nav className="user-view__menu">
          <ul className="side-nav">
            <NavItem link="#" text="Settings" icon="settings" active={true} />
            <NavItem
              link="/my-tours"
              text="My Bookings"
              icon="briefcase"
              active={false}
            />
            <NavItem link="#" text="My reviews" icon="star" active={false} />
            <NavItem
              link="#"
              text="Billing"
              icon="credit-card"
              active={false}
            />
          </ul>

          {user.role === "admin" && (
            <div className="admin-nav">
              <h5 className="admin-nav__heading">Admin</h5>
              <ul className="side-nav">
                <NavItem
                  link="#"
                  text="Manage tours"
                  icon="map"
                  active={false}
                />
                <NavItem
                  link="#"
                  text="Manage users"
                  icon="users"
                  active={false}
                />
                <NavItem
                  link="#"
                  text="Manage reviews"
                  icon="star"
                  active={false}
                />
                <NavItem
                  link="#"
                  text="Manage Bookings"
                  icon="briefcase"
                  active={false}
                />
              </ul>
            </div>
          )}
        </nav>

        <div className="user-view__content">
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">
              Your account settings
            </h2>

            <form onSubmit={handleDataSubmit} className="form form-user-data">
              <div className="form__group">
                <label className="form__label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  className="form__input"
                  type="text"
                  //   value={updateUserData.name}
                  defaultValue={user.name}
                  required
                  onChange={handleDataChange}
                />
              </div>

              <div className="form__group ma-bt-md">
                <label className="form__label" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  className="form__input"
                  type="email"
                  //   value={updateUserData.email}
                  required
                  defaultValue={user.email}
                  onChange={handleDataChange}
                />
              </div>

              <div className="form__group form__photo-upload">
                <img
                  className="form__user"
                  src={`${process.env.REACT_APP_API_URL}/img/users/${user.photo}`}
                  alt="User"
                />
                <input
                  className="form__upload"
                  type="file"
                  accept="image/*"
                  id="photo"
                  name="photo"
                  onChange={handleDataChange}
                />
                <label htmlFor="photo">Choose new photo</label>
              </div>

              <div className="form__group right">
                <button className="btn btn--small btn--green">
                  Save settings
                </button>
              </div>
            </form>
          </div>

          <div className="line">&nbsp;</div>

          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Password change</h2>

            <form
              onSubmit={handlePassSubmit}
              className="form form-user-settings"
            >
              <div className="form__group">
                <label className="form__label" htmlFor="password-current">
                  Current password
                </label>
                <input
                  id="password-current"
                  className="form__input"
                  name="currentPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength="8"
                  value={updatedUserPass.currentPassword}
                  onChange={handlePassChange}
                />
              </div>

              <div className="form__group">
                <label className="form__label" htmlFor="password">
                  New password
                </label>
                <input
                  id="password"
                  className="form__input"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={updatedUserPass.password}
                  onChange={handlePassChange}
                  minLength="8"
                />
              </div>

              <div className="form__group ma-bt-lg">
                <label className="form__label" htmlFor="password-confirm">
                  Confirm password
                </label>
                <input
                  id="password-confirm"
                  className="form__input"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={updatedUserPass.confirmPassword}
                  minLength="8"
                  onChange={handlePassChange}
                />
              </div>

              <div className="form__group right">
                <button className="btn btn--small btn--green">
                  Save password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Account;
