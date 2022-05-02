import {ClientProps} from "../../types/client"
import { api } from "../../services/api";
import {
    message,
  } from "antd";
export async function create(clientToSubimit: ClientProps) {
    return await api
      .post<ClientProps>("/client", clientToSubimit)
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
             message.success('Cliente cadastrado!')
             const client = response.data;
             return client
        }
    });
}
export async function get() {
  return await api
      .get<any>("/client")
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
             const clients = response.data;
             return clients
        }
    });
}
export async function remove(id:any) {
  return await api
      .delete("/client",id)
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
             message.success('Cliente excluído!')
             const client = response.data;
             return client
        }
    });
}