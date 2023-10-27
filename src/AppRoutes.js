import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MenuNavbar from "./components/MenuNavbar";
import Bottom from "./components/Bottom";
import Dashboard from "./components/DashboardComponents/Dashboard";
import Search from "./components/SearchComponents/Search";
import FakeNewInformation from "./components/FakeNewsComponents/FakeNewInformation";
import NotificationHistory from "./components/FakeNewsComponents/NotificationHistory";
import PersonalInformation from "./components/FakeNewsComponents/PersonalInformation";
import ManageMembers from "./components/Admin/ManageMembers";
import ManuContent from "./components/Admin/ManageContent/ManuContent";
import FormContent from "./components/Admin/ManageContent/FormContent";
import ManageValues from "./components/Admin/ManageContent/ManageValues";
import AdvancedSearch from "./components/Admin/AdvancedSearch";
import MChecking from "./components/Admin/ManageFakeNews/MChecking";
import MInformation from "./components/Admin/ManageFakeNews/MInformation";
import MMedia from "./components/Admin/ManageFakeNews/MMedia";
import MProblem from "./components/Admin/ManageFakeNews/MProblem";
import MType from "./components/Admin/ManageFakeNews/MType";
import MenuProfile from "./components/UserComoponents/MenuProfile";
import Profile from "./components/UserComoponents/Profile";
import Login from "./components/UserComoponents/Login";
import Register from "./components/UserComoponents/Register";
import Fninfoview from "./components/FakeNewsComponents/Fn_info_view";
import Fninfoedit from "./components/FakeNewsComponents/Fn_info_edit";

import { Box } from "@mui/material";

const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/FakeNews", element: <FakeNewInformation /> },
  { path: "/FakeNews/PersonalInformation", element: <PersonalInformation /> },
  { path: "/FakeNews/NotificationHistory", element: <NotificationHistory /> },
  { path: "/Search", element: <Search /> },
  { path: "/Admin", element: <ManageMembers /> },
  { path: "/Admin/ManuContent", element: <ManuContent /> },
  { path: "/Admin/FormContent", element: <FormContent /> },
  { path: "/Admin/ManageValues", element: <ManageValues /> },
  { path: "/Admin/AdvancedSearch", element: <AdvancedSearch /> },
  { path: "/Admin/MChecking", element: <MChecking /> },
  { path: "/Admin/MInformation", element: <MInformation /> },
  { path: "/Admin/MMedia", element: <MMedia /> },
  { path: "/Admin/MProblem", element: <MProblem /> },
  { path: "/Admin/MType", element: <MType /> },
  { path: "/User/MenuProfile", element: <MenuProfile /> },
  { path: "/User/Profile", element: <Profile /> },
  { path: "/User/Login", element: <Login /> },
  { path: "/User/Register", element: <Register /> },
  { path: "/FakeNews/fninfoview/:id", element: <Fninfoview /> },
  { path: "/FakeNews/edit/:id", element: <Fninfoedit /> },
];

const AppRoutes = () => {
  return (
    <Router>
      <div>
        <MenuNavbar />
        <div>
          <Box height="10vh" />
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} {...route} />
            ))}
          </Routes>
        </div>
        <Bottom />
      </div>
    </Router>

  );

};

export default AppRoutes;
