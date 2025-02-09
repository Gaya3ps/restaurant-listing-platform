import { Route, Routes, useNavigate } from "react-router";
import AboutUs from "../../pages/user/AboutUs";
import Register from "../../pages/user/Register";
import Login from "../../pages/user/Login";
import LandingPage from "../../pages/user/LandingPage";
import Home from "../../pages/user/Home";

const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        {/* <Route path="" element={<UserPrivateRoutes />}>
        </Route> */}
      </Routes>
    </>
  );
};

export default UserRoutes;
