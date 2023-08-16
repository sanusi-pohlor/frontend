import React from "react";
import { Paper } from "@mui/material";

const Carousel = () => {
  const curveAngle = 20;
  const paperColor = "#FFFFFF";

  return (
    <Paper
      elevation={0}
      style={{
        width: "100%",
        height: 300,
        margin: "auto",
        backgroundColor: paperColor,
      }}
    ></Paper>
  );
};

export default Carousel;
