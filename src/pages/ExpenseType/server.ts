import {ExpenseTypeProps} from "../../types/expenseType"
import { api } from "../../services/api";
import {
    message,
  } from "antd";
export async function create(expenseTypeToSubimit: ExpenseTypeProps) {
    return await api
      .post<ExpenseTypeProps>("/expenseType", expenseTypeToSubimit)
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
             message.success('Tipo de despesa cadastrada!')
             return response.data;  
        }
    });
}
export async function get() {
  return await api
      .get<any>("/expenseType")
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
             return response.data;}
    });
}
export async function remove(id:any) {
  return await api
      .delete("/expenseType",id)
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
             message.success('Tipo de despesa excluída!')
             return response.data;
        }
    });
}