import { useState } from "react";
import loginUser from "../apiFuntions/loginUser";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      // console.log(res.data.data);
      setUser(res.data.data.user);
      if (res.statusText === "OK") alert("Login Successful");
      window.setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      alert(err);
      // console.log(err);
    }
  }

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form__group">
            <label htmlFor="email" className="form__label">
              Email address
            </label>
            <input
              id="email"
              className="form__input"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="form__group ma-bt-md">
              <label htmlFor="password" className="form__label">
                Password
              </label>
              <input
                id="password"
                className="form__input"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>

            <div className="form__group">
              <button className="btn btn--green">Login</button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
