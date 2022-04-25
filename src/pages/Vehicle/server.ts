import {VehicleProps} from "../../types/vehicle"
import { api } from "../../services/api";
import {
    message,
  } from "antd";
export async function create(vehicleToSubimit: VehicleProps) {
  debugger
    return await api
      .post<VehicleProps>("/vehicle", vehicleToSubimit)
      .catch((error) => {
        if (error.response) {
          message.warning(error.response.data.message);
        } else if (error.request) {
          message.warning("Conexão com servidor falhou");
        } else {
          // Alguma coisa acontenceu ao configurar a requisição que acionou este erro.
          console.error("Error", error.message);
        }
      }).then((response) => {
        if(response) {
             message.success('Veiculo cadastrado!')
             const vehicle = response.data;
             return vehicle
        }
    });
}
export async function get() {
  return await api
      .get<any>("/vehicle")
      .catch((error) => {
        if (error.response) {
          message.warning(error.response.data.message);
        } else if (error.request) {
          message.warning("Conexão com servidor falhou");
        } else {
          // Alguma coisa acontenceu ao configurar a requisição que acionou este erro.
          console.error("Error", error.message);
        }
      }).then((response) => {
        if(response) {
             const vehicles = response.data;
             return vehicles
        }
    });
}
export async function remove(id:any) {
  return await api
      .delete("/vehicle",id)
      .catch((error) => {
        if (error.response) {
          message.warning(error.response.data.message);
        } else if (error.request) {
          message.warning("Conexão com servidor falhou");
        } else {
          // Alguma coisa acontenceu ao configurar a requisição que acionou este erro.
          console.error("Error", error.message);
        }
      }).then((response) => {
        if(response) {
             message.success('Veiculo excluído!')
             const vehicle = response.data;
             return vehicle
        }
    });
}