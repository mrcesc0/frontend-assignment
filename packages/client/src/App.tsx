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
          <Col
            xl={{ span: 8, offset: 8 }}
            lg={{ span: 10, offset: 7 }}
            md={{ span: 12, offset: 6 }}
            sm={{ span: 14, offset: 5 }}
            xs={{ span: 22, offset: 1 }}
          >
            <SearchBar placeholder="Search a pokemon..." />
          </Col>
        </Row>
        <Separator />
        <Row>
          <Col
            lg={{ span: 18, offset: 3 }}
            md={{ span: 20, offset: 2 }}
            sm={{ span: 22, offset: 1 }}
          >
            <Table />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default App;
