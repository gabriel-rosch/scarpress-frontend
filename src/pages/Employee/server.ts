import {EmployeeProps} from "../../types/employee"
import { api } from "../../services/api";
import {
    message,
  } from "antd";
export async function create(expenseTypeToSubimit: EmployeeProps) {
    return await api
      .post<EmployeeProps>("/employee", expenseTypeToSubimit)
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
             message.success('Funcionário cadastrado!')
             return response.data;  
        }
    });
}
export async function get() {
  return await api
      .get<any>("/employee")
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
             return response.data;
        }
    });
}
export async function remove(id:any) {
  return await api
      .delete("/employee",id)
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
             message.success('Funcionário excluído!')
             return response.data;
        }
    });
}