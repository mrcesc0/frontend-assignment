import React from "react";
import { Layout, PageHeader, Input, Row, Col } from "antd";

import "./App.css";

const { Content } = Layout;

const App = () => (
  <Layout>
    <PageHeader
      className="header"
      title="Pokèmons"
      subTitle="Gotta catch'em all"
    />
    <Content className="content">
      <Row>
        <Col span={8} offset={8}>
          <Input.Group size="large">
            <Input.Search
              className="input-search-pokemons"
              placeholder="Search a pokemon..."
              defaultValue=""
              size="large"
              allowClear={true}
              minLength={3}
              loading={false}
            />
          </Input.Group>
        </Col>
      </Row>
    </Content>
  </Layout>
);

export default App;
