import { useEffect, useState } from "react";
import "./index.css";

import Overview from "./components/Overview";
import Tour from "./components/Tour";
import Login from "./components/Login";
import ErrorPage from "./components/ErrroPage";
import MainLayout from "./components/MainLayout";

import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";

import { Route, Routes } from "react-router-dom";
import getAllTours from "./apiFuntions/getAllTours";
import { AuthProvider } from "./context/AuthContext";
import Account from "./components/Account";
import Bookings from "./components/Bookings";

function App() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const tours = await getAllTours();
      setTours(tours);
    };
    fetchData();
  }, []);

  return (
    <AuthProvider>
      <Routes>
        {/* Routes WITH Header & Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Overview tours={tours} />} />

          <Route path="/tours/view/:slug" element={<Tour />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/me"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-tours"
            element={
              <PrivateRoute>
                <Bookings />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="*" element={<ErrorPage />} />
        {/* <Route path="*" element={<Navigate to="/404" replace />} /> */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
