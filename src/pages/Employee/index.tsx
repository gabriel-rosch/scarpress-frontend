/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { EmployeeProps } from "../../types/employee";
import { VehicleProps } from "../../types/vehicle";
import { create, get, remove } from "./server";
import { get as getVehiclesCombo } from "../Vehicle/server";
import { useEffect, useState } from "react";
import {validateBr} from 'js-brasil';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Table,
  Space,
  Select,
  DatePicker,
} from "antd";
import locale from "antd/es/date-picker/locale/pt_BR";
import { Option } from "antd/lib/mentions";

export function Employee() {
  const [dataSource, setDataSource] = useState<EmployeeProps[]>([]);
  const [vehicles, setVehicles] = useState<VehicleProps[]>([]);
  const [form] = Form.useForm();

  async function onFinish(employeeToSubimit: EmployeeProps) {
    debugger;
    await create(employeeToSubimit).then((employee) => {
      if (employee) {
        //setDataSource([employee, ...dataSource]);
        onReset();
      }
    });
  }

  async function getEmployee() {
    const employees = await get();
    setDataSource(employees);
  }

  async function getVehicles() {
    const vehicles = await getVehiclesCombo();
    setVehicles(vehicles);
  }

  useEffect(() => {
    getEmployee();
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
      title: "Função",
      dataIndex: "occupation",
      key: "occupation",
    },
    {
      title: "Comissão %",
      dataIndex: "commission",
      key: "commission",
    },
    {
      title: "Admissão",
      dataIndex: "admission",
      key: "admission",
    },
    {
      title: "Uniforme",
      dataIndex: "uniform",
      key: "uniform",
    },
    {
      title: "Birth",
      dataIndex: "birth",
      key: "birth",
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
    <Form name="employee" form={form} onFinish={onFinish}>
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
        <Col span={6}>
          <Form.Item name="occupation">
            <Select placeholder="Função">
              <Option value="Adiministração">Adiministração</Option>
              <Option value="Motorista">Motorista</Option>
              <Option value="Marketing">Marketing</Option>
              <Option value="Outro">Outro</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="commission">
            <Input type="number" placeholder="Commissão %" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="admission">
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Admissão"
              picker="date"
              locale={locale}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="vehicleId">
            <Select placeholder="Veículo">
              {vehicles.map((v) => {
                return <Option value={v.id}>{v.plate}</Option>;
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="uniform">
            <Select placeholder="Uniforme">
              <Option value="P">P</Option>
              <Option value="M">M</Option>
              <Option value="G">G</Option>
              <Option value="GG">GG</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="birth">
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Nascimento"
              picker="date"
              locale={locale}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="cpf"
            rules={[
              () => ({
                validator(_, value) {
                  if (!value || validateBr.cpf(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "CPF inválido"
                    )
                  );
                },
              }),
            ]}
          >
            <Input type='number' placeholder="CPF" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="rg"
            rules={[
              () => ({
                validator(_, value) {
                  if (!value || validateBr.rg(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "RG inválido"
                    )
                  );
                },
              }),
            ]}
          >
            <Input type="number" placeholder="RG" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="pis"
             rules={[
              () => ({
                validator(_, value) {
                  if (!value || validateBr.pispasep(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "PIS inválido"
                    )
                  );
                },
              }),
            ]}
          >
            <Input type="number" placeholder="PIS" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="email">
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="cnh"
             rules={[
              () => ({
                validator(_, value) {
                  if (!value || validateBr.cnh(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "CNH inválida"
                    )
                  );
                },
              }),
            ]}
          >
            <Input type="number" placeholder="CNH" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="cnhValidate">
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Validade CNH"
              picker="date"
              locale={locale}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="toxicologicalExam">
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Exame Tóxicologico"
              picker="date"
              locale={locale}
            />
          </Form.Item>
        </Col>
        
        <Col span={6}>
          <Form.Item name="resignation">
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Demissão"
              picker="date"
              locale={locale}
            />
          </Form.Item>
        </Col>
        
        <Col span={24}>
          <Space>Endereço:</Space>
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
