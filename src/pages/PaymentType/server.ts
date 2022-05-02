import {PaymentTypeProps} from "../../types/paymentType"
import { api } from "../../services/api";
import {
    message,
  } from "antd";
export async function create(paymentTypeToSubimit: PaymentTypeProps) {
    return await api
      .post<PaymentTypeProps>("/paymentType", paymentTypeToSubimit)
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
             message.success('Forma de Pagamento cadastrada!')
             return response.data;  
        }
    });
}
export async function get() {
  return await api
      .get<any>("/paymentType")
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
      .delete("/paymentType",id)
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
             message.success('Forma de Pagamento excluída!')
             return response.data;
        }
    });
}