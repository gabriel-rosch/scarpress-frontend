import { Layout, Menu as MenuAntd } from "antd";
import { Link } from "react-router-dom";
import { SaveOutlined, FundOutlined, SettingOutlined } from "@ant-design/icons";
const { SubMenu } = MenuAntd;
const { Sider } = Layout;

interface MenuProps {
  collapsed: boolean;
}

export function Menu({ collapsed }: MenuProps) {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <MenuAntd
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1", "sub2"]}
        style={{ height: "100vw" }}
      >
        <MenuAntd.Item key="1" icon={<FundOutlined />}>
          <Link to="/">Menu</Link>
        </MenuAntd.Item>

        <SubMenu key="sub1" icon={<SettingOutlined />} title="Gerenciar">
          <MenuAntd.Item key="2">
            <Link to="/gerenciar-despesa">Despesas</Link>
          </MenuAntd.Item>
          <MenuAntd.Item key="3">
            <Link to="/gerenciar-frete">Fretes</Link>
          </MenuAntd.Item>
          
          <MenuAntd.Item key="5">
            <Link to="/gerenciar-multa">Multas</Link>
          </MenuAntd.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<SaveOutlined />} title="Cadastrar">
          <MenuAntd.Item key="6">
            <Link to="/despesa">Despesa</Link>
          </MenuAntd.Item>
          <MenuAntd.Item key="7">
            <Link to="/frete">frete</Link>
          </MenuAntd.Item>
          <MenuAntd.Item key="4">
            <Link to="/veiculo">Veículo</Link>
          </MenuAntd.Item>
          <MenuAntd.Item key="8">
            <Link to="/cliente">Cliente</Link>
          </MenuAntd.Item>
          <MenuAntd.Item key="9">
            <Link to="/multas">Multas</Link>
          </MenuAntd.Item>
          <MenuAntd.Item key="10">
            <Link to="/funcionario">Funcionários</Link>
          </MenuAntd.Item>
          <MenuAntd.Item key="11">
            <Link to="/forma-pagamento">Forma de Pagamento</Link>
          </MenuAntd.Item>
          <MenuAntd.Item key="12">
            <Link to="/tipo-despesa">Tipo de Despesa</Link>
          </MenuAntd.Item>
        </SubMenu>
      </MenuAntd>
    </Sider>
  );
}
