/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { ExpenseTypeProps } from "../../types/expenseType";
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

export function ExpenseType() {
  const [dataSource, setDataSource] = useState<ExpenseTypeProps[]>([]);
  const [form] = Form.useForm();

  async function onFinish(expenseTypeToSubimit: ExpenseTypeProps) {
    await create(expenseTypeToSubimit).then((expenseType) => {
      if (expenseType) {
        setDataSource([expenseType, ...dataSource]);
        onReset();
      }
    });
  }

  async function getExpenseType() {
    const expenseTypes = await get();
    setDataSource(expenseTypes);
  }

  useEffect(() => {
    getExpenseType();
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
      title: "Grupo",
      dataIndex: "isCommon",
      key: "isCommon",
      render: checkIsCommon,
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
              row.isCommon = row.isCommon? 'true' : 'false';
              form.setFieldsValue(row);
            }}
          >
            Editar
          </a>
        </Space>
      ),
    },
  ];
  function checkIsCommon(checked: any, a: any) {
    if (a.isCommon) {
      return <span>Em Comum</span>;
    } else {
      return <span>Por Veículo</span>;
    }
  }

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
    <Form name="expenseType" form={form} onFinish={onFinish}>
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
        <Col span={12}>
          <Form.Item name="isCommon">
            <Select placeholder="Grupo">
              <Option value="true">Em Comum</Option>
              <Option value="false">Por Veículo</Option>
            </Select>
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
