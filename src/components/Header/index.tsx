// import logoImg from "../../assets/logo.svg";
// import { Container } from "./styles"; //Content
import React, { useState } from "react";
import { Button, Layout, Menu } from "antd";

import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

interface HeaderProps {
  onClickOpenMenu: () => void;
  collapsed: boolean;
}

export function Header({ onClickOpenMenu, collapsed }: HeaderProps) {
  const { Header } = Layout;

  return (
    <Header
      style={{ padding: 0, backgroundColor:'#232e44' }}
    >
      {/* <Container>
        <Content>
          <button type="button" onClick={onClickModal}>
            Menu
          </button>
          <img src={logoImg} alt="scarpress" />
        </Content>
      </Container> */}
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: onClickOpenMenu,
      })}
    </Header>
  );
}
