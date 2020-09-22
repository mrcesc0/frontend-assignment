import React from "react";
import { Layout, PageHeader, Row, Col } from "antd";

import Separator from "./components/Separator/Separator";
import SearchBar from "./components/SearchBar/SearchBar";
import Table from "./components/Table/Table";

import "./App.css";

const { Content } = Layout;

const App = (): JSX.Element => {
  return (
    <Layout>
      <PageHeader
        className="header"
        title="Pokèmons"
        subTitle="Gotta catch'em all"
      />
      <Content className="content">
        <Row>
          <Col span={8} offset={8}>
            <SearchBar placeholder="Search a pokemon..." />
          </Col>
        </Row>
        <Separator />
        <Row>
          <Col span={18} offset={3}>
            <Table />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default App;
