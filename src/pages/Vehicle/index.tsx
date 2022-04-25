/* eslint-disable use-isnan */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { VehicleProps } from "../../types/vehicle";
import { create, get, remove } from "./server";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  DatePicker,
  Checkbox,
  Table,
  Space,
  TreeSelect,
} from "antd";
import {} from "antd";

import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { debug } from "console";

export function Vehicle() {
  const [dataSource, setDataSource] = useState<VehicleProps[]>([]);
  const [articulateds, setArticulateds] = useState<any[]>([]);
  const [form] = Form.useForm();

  const formRef = useRef<any>();
  const { TreeNode } = TreeSelect;

  async function onFinish(vehicleToSubimit: VehicleProps) {
    let dateYear = new Date(vehicleToSubimit.year);
    vehicleToSubimit.year = dateYear.getFullYear().toString();
    await create(vehicleToSubimit).then((vehicle) => {
      if (vehicle) {
        debugger
        setDataSource([vehicle, ...dataSource]);
        onReset();
      }
    });
    //dataSource.push(vehicle);
  }
  async function getVehicles() {
    const vehicles = await get();
    debugger;
    setDataSource(vehicles);
  }
  useEffect(() => {
    getVehicles();
  }, []);

  function onReset() {
    formRef.current!.resetFields();
  }

  const columns = [
    {
      title: "Placa",
      dataIndex: "plate",
      key: "plate",
    },
    {
      title: "Nome do Caminhão",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Proprietário/procurador",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Cavalo",
      dataIndex: "horse",
      key: "horse",
      render: checkHourse,
    },
    {
      title: "Ratreado",
      dataIndex: "tracked",
      key: "tracked",
      render: checkTracked,
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
              debugger
              debugger
              if(row.year == 'NaN'){
                let date = moment().set("year",row.year);
                row.year = date;
              }
              if(row.articulateds.length > 0) {
                row.articulateds = row.articulateds.map((art: any) => {
                  let a = dataSource.filter((data) => {
                    return data.id == art.vehicleArticulatedId;
                  })[0]?.plate;
                  return a;
                });
              }
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

  function checkHourse(checked: any, a: any) {
    if (a.hourse) {
      return <span>Sim</span>;
    }
  }
  function checkTracked(checked: any, a: any) {
    if (a.tracked) {
      return <span>Sim</span>;
    }
  }

  function onChangeArticulateds(values: any) {
    setArticulateds([...values]);
  }

  return (
    <Form name="vheicle" ref={formRef} form={form} onFinish={onFinish}>
      <Row gutter={20}>
        <Col span={6}>
          <Form.Item
            className="col-12"
            name="plate"
            rules={[
              {
                required: true,
                message: "Placa é obrigatório!",
              },
            ]}
          >
            <Input placeholder="Placa" />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item name="chassis">
            <Input placeholder="chassi" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Nome é obrigatório!",
              },
            ]}
            name="description"
          >
            <Input placeholder="Nome do Caminão" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="model">
            <Input placeholder="Modelo" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="year">
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Ano"
              picker="year"
              format="YYYY"
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="renavan">
            <Input type="number" placeholder="Renavan" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="brand">
            <Input placeholder="Marca/Fabricante" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="weight">
            <Input type="number" placeholder="Peso do veiculo(Kg)" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="axes">
            <Input type="number" placeholder="Eixos" />
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item
            style={{ marginLeft: "0.3rem" }}
            name="tracked"
            label="Rastreado"
            valuePropName="checked"
          >
            <Checkbox defaultChecked={true} />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            style={{ marginLeft: "0.3rem" }}
            name="hourse"
            label="Cavalo"
            valuePropName="checked"
          >
            <Checkbox defaultChecked={true} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="owner">
            <Input placeholder="Proprietário/Procurador" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="articulateds">
            <TreeSelect
              showSearch
              style={{ width: "100%" }}
              value={articulateds}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              placeholder="Please select"
              allowClear
              multiple
              treeDefaultExpandAll
              onChange={onChangeArticulateds}
            >
              {dataSource.map((v) => {
                return <TreeNode value={v.id} title={v.plate} />;
              })}
            </TreeSelect>
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
