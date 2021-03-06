import { Header } from "../../components/Header";
import { useState } from "react";
import Modal from "react-modal";
import { Menu } from "../../components/Menu";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import routes from "../../config/routes";
import { Layout } from "antd";
const { Content } = Layout;
Modal.setAppElement("#root");
export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);

  function toggle() {
    setCollapsed(!collapsed);
  }

  return (
    <Layout>
      <Menu collapsed={collapsed} />
      <Layout className="site-layout">
        <Header onClickOpenMenu={toggle} collapsed={collapsed} />
        <Content
          className="site-layout-background"
          style={{
            margin: "16px 11px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <BrowserRouter>
            <Switch>
              {routes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={<route.component />}
                  />
                );
              })}
            </Switch>
          </BrowserRouter>
        </Content>
      </Layout>
    </Layout>
  );
}
