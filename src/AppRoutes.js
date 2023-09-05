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
import UserProfile from "./components/UserComoponents/UserProfile";
import Login from "./components/UserComoponents/Login";
import Register from "./components/UserComoponents/Register";
import {
  Box,
} from "@mui/material";

const AppRoutes = () => {
  return (
    <Router>
      <div>
        <MenuNavbar />
        <div id="background" className="background">
          <Box height="6vh" />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/FakeNews" element={<FakeNewInformation />} />
            <Route
              path="/FakeNews/PersonalInformation"
              element={<PersonalInformation />}
            />
            <Route
              path="/FakeNews/NotificationHistory"
              element={<NotificationHistory />}
            />
            <Route path="/Search" element={<Search />} />
            <Route path="/Admin" element={<ManageMembers />} />
            <Route path="/Admin/ManuContent" element={<ManuContent />} />
            <Route path="/Admin/FormContent" element={<FormContent />} />
            <Route path="/Admin/ManageValues" element={<ManageValues />} />
            <Route path="/Admin/AdvancedSearch" element={<AdvancedSearch />} />
            <Route path="/Admin/MChecking" element={<MChecking />} />
            <Route path="/Admin/MInformation" element={<MInformation />} />
            <Route path="/Admin/MMedia" element={<MMedia />} />
            <Route path="/Admin/MProblem" element={<MProblem />} />
            <Route path="/Admin/MType" element={<MType />} />
            <Route path="/User/Profile" element={<UserProfile />} />
            <Route path="/User/Login" element={<Login />} />
            <Route path="/User/Register" element={<Register />} />
          </Routes>
        </div>
        <Bottom />
      </div>
    </Router>
  );
};

export default AppRoutes;
