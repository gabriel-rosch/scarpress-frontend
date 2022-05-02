/* eslint-disable use-isnan */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { ClientProps } from "../../types/client";
import { create, get, remove } from "./server";
import { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Table,
  Space,
  Select,
} from "antd";
import {} from "antd";
import { Option } from "antd/lib/mentions";

export function Client() {
  const [dataSource, setDataSource] = useState<ClientProps[]>([]);
  const [form] = Form.useForm();

  async function onFinish(clientToSubimit: ClientProps) {
    await create(clientToSubimit).then((client) => {
      if (client) {
        setDataSource([client, ...dataSource]);
        onReset();
      }
    });
  }

  async function getVehicles() {
    const vehicles = await get();
    setDataSource(vehicles);
  }

  useEffect(() => {
    getVehicles();
  }, []);

  function onReset() {
    form.resetFields();
  }

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Cnpj",
      dataIndex: "cnpj",
      key: "cnpj",
    },
    {
      title: "Cep",
      dataIndex: "cep",
      key: "cep",
    },
    {
      title: "Bairro",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Endereço",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Cidade",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Cidade",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Complemento",
      dataIndex: "complement",
      key: "complement",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ação",
      key: "action",
      render: (row: any) => (
        <Space size="middle">
          <a
            onClick={() => {
              onRemove(row.id);
            }}
          >
            Excluir
          </a>
          <a
            onClick={() => {
              form.setFieldsValue(row);
            }}
          >
            Editar
          </a>
        </Space>
      ),
    },
  ];

  async function onRemove(id: any) {
    await remove({ data: { id } }).then((vehicle) => {
      if (vehicle) {
        const vehicles = dataSource.filter((v) => {
          return v.id != vehicle.id;
        });
        setDataSource(vehicles);
      }
    });
    //dataSource.push(vehicle);
  }
  return (
    <Form name="client" form={form} onFinish={onFinish}>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Nome é obrigatório!",
              },
            ]}
          >
            <Input placeholder="Nome" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cnpj">
            <Input placeholder="Cnpj" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="cep">
            <Input placeholder="Cep" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="district">
            <Input placeholder="Bairro" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="address">
            <Input placeholder="Endereço" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="city">
            <Input placeholder="Cidade" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="state">
            <Select defaultValue="SC" placeholder="Estado">
              <Option value="AL">AL</Option>
              <Option value="AP">AP</Option>
              <Option value="AM">AM</Option>
              <Option value="BA">BA</Option>
              <Option value="CE">CE</Option>
              <Option value="DF">DF</Option>
              <Option value="ES">ES</Option>
              <Option value="GO">GO</Option>
              <Option value="MA">MA</Option>
              <Option value="MT">MT</Option>
              <Option value="MS">MS</Option>
              <Option value="MG">MG</Option>
              <Option value="PA">PA</Option>
              <Option value="PB">PB</Option>
              <Option value="PR">PR</Option>
              <Option value="PE">PE</Option>
              <Option value="PI">PI</Option>
              <Option value="RJ">RJ</Option>
              <Option value="RN">RN</Option>
              <Option value="RS">RS</Option>
              <Option value="RO">RO</Option>
              <Option value="RR">RR</Option>
              <Option value="SC">SC</Option>
              <Option value="SP">SP</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="complement">
            <Input placeholder="Complemento" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="email">
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "end",
            paddingRight: "0.7rem",
          }}
        >
          <Form.Item name="owner">
            <Button onClick={onReset}>Limpar</Button>
          </Form.Item>
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "start",
            paddingLeft: "0.8rem",
          }}
        >
          <Form.Item name="owner">
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table rowKey="id" dataSource={dataSource} columns={columns} />
        </Col>
      </Row>
    </Form>
  );
}
