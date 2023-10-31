import React from 'react';
import {
    Card
} from "antd";
import { Box } from "@mui/material";

const News_views = () => {
    const curveAngle = 20;
    const paperColor = "#FFFFFF";
    return <div>
        <Box style={{
            width: "70%",
            padding: 30,
            margin: "0 auto", // This centers the paper horizontally
            textAlign: "center", // This centers the content inside the paper
        }}>                          <Card
        style={{
          marginBottom: "16px",
          width: "100%",
          height: "100%",
          padding: 20,
        }}
      >
      </Card></Box></div>;
};

export default News_views;