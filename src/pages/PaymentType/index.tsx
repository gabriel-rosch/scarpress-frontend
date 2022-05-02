/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { PaymentTypeProps } from "../../types/paymentType";
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
} from "antd";

export function PaymentType() {
  const [dataSource, setDataSource] = useState<PaymentTypeProps[]>([]);
  const [form] = Form.useForm();

  async function onFinish(paymentTypeToSubimit: PaymentTypeProps) {
    await create(paymentTypeToSubimit).then((paymentType) => {
      if (paymentType) {
        setDataSource([paymentType, ...dataSource]);
        onReset();
      }
    });
  }

  async function getPaymentType() {
    const paymentTypes = await get();
    setDataSource(paymentTypes);
  }

  useEffect(() => {
    getPaymentType();
  }, []);

  function onReset() {
    form.resetFields();
  }

  const columns = [
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
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
    await remove({ data: { id } }).then((dataReturn) => {
      if (dataReturn) {
        const dataSourceFilter = dataSource.filter((obj) => {
          return obj.id != dataReturn.id;
        });
        setDataSource(dataSourceFilter);
      }
    });
  }

  return (
    <Form name="paymentType" form={form} onFinish={onFinish}>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Descrição é obrigatório!",
              },
            ]}
          >
            <Input placeholder="Nome" />
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
