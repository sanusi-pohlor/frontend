import * as React from "react";
import Grid from "@mui/material/Grid";
import { Paper, Button } from "@mui/material";
import FakeNewInformation from "./FakeNewInformation";
import PersonalInformation from "./PersonalInformation";
import NotificationHistory from "./NotificationHistory";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Link from "@mui/material/Link";
import FakeNewsMenu from "./FakeNewsMenu";

const FakeNews = () => {
  return (
    <Routes>
      <Route exact path="/FakeNews" element={<FakeNewInformation />} />
      <Route
        path="/FakeNews/PersonalInformation"
        element={<PersonalInformation />}
      />
      <Route
        path="/FakeNews/NotificationHistory"
        element={<NotificationHistory />}
      />
    </Routes>
  );
};
export default FakeNews;
