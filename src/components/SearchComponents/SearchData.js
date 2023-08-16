import React from "react";
import { Card, Space, Col, Divider, Row, Image } from "antd";
import { CardActionArea } from "@mui/material";

const DemoBox = (props) => (
  <p className={`height-${props.value}`}>{props.children}</p>
);

const SearchData = () => {
  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: "flex",
      }}
    >
      <CardActionArea>
        <Card hoverable title="Card" size="small">
          <Row justify="space-around" align="middle">
            <Col span={4}>
              <DemoBox value={100}>
                <Image
                  width={200}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
              </DemoBox>
            </Col>
            <Col span={8}>
              <DemoBox value={50}>col-4col-4col-4col-4col-4col-4col-4</DemoBox>
            </Col>
            <Col span={4}>
              <DemoBox value={80}>col-4</DemoBox>
            </Col>
          </Row>
        </Card>
      </CardActionArea>
      <Card hoverable title="Card" size="small">
        <Row justify="space-around" align="middle">
          <Col span={4}>
            <DemoBox value={100}>
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={50}>col-4</DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={120}>col-4</DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={80}>col-4</DemoBox>
          </Col>
        </Row>
      </Card>
      <Card hoverable title="Card" size="small">
        <Row justify="space-around" align="middle">
          <Col span={4}>
            <DemoBox value={100}>
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={50}>col-4</DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={120}>col-4</DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={80}>col-4</DemoBox>
          </Col>
        </Row>
      </Card>
      <Card hoverable title="Card" size="small">
        <Row justify="space-around" align="middle">
          <Col span={4}>
            <DemoBox value={100}>
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={50}>col-4</DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={120}>col-4</DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={80}>col-4</DemoBox>
          </Col>
        </Row>
      </Card>
      <Card hoverable title="Card" size="small">
        <Row justify="space-around" align="middle">
          <Col span={4}>
            <DemoBox value={100}>
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={50}>col-4</DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={120}>col-4</DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={80}>col-4</DemoBox>
          </Col>
        </Row>
      </Card>
      <Card hoverable title="Card" size="small">
        <Row justify="space-around" align="middle">
          <Col span={4}>
            <DemoBox value={100}>
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={50}>col-4</DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={120}>col-4</DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={80}>col-4</DemoBox>
          </Col>
        </Row>
      </Card>
      <Card hoverable title="Card" size="small">
        <Row justify="space-around" align="middle">
          <Col span={4}>
            <DemoBox value={100}>
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={50}>col-4</DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={120}>col-4</DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={80}>col-4</DemoBox>
          </Col>
        </Row>
      </Card>
      <Card hoverable title="Card" size="small">
        <Row justify="space-around" align="middle">
          <Col span={4}>
            <DemoBox value={100}>
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={50}>col-4</DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={120}>col-4</DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={80}>col-4</DemoBox>
          </Col>
        </Row>
      </Card>
      <Card hoverable title="Card" size="small">
        <Row justify="space-around" align="middle">
          <Col span={4}>
            <DemoBox value={100}>
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={50}>col-4</DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={120}>col-4</DemoBox>
          </Col>
          <Col span={4}>
            <DemoBox value={80}>col-4</DemoBox>
          </Col>
        </Row>
      </Card>
    </Space>
  );
};

export default SearchData;
