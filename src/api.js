export const API_URL = "http://localhost:8000/api/";

export function LOGIN(usuario, senha) {
  const token = localStorage.getItem("token");
  return {
    url: API_URL + "auth/login",
    options: {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ usuario, senha }),
    },
  };
}

export function GET_USUR() {
  const token = localStorage.getItem("token");
  return {
    url: API_URL + `get/usur`,
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  };
}

export function GET_VEICULOS(searchTerm) {
  const token = localStorage.getItem("token");
  return {
    url: API_URL + `veiculos?search=${searchTerm}`,
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  };
}
export function GET_ROTAS(placa) {
  const token = localStorage.getItem("token");
  return {
    url: API_URL + `get/rotas?placa=${placa}`,
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  };
}
export function CREATE_VEICULOS(data) {
  const token = localStorage.getItem("token");
  return {
    url: API_URL + "insert/veiculos",
    options: {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    },
  };
}
export function CREATE_ROTAS(data) {
  console.log("🚀 - CREATE_ROTAS - data:", data);
  const token = localStorage.getItem("token");
  return {
    url: API_URL + "insert/rotas",
    options: {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    },
  };
}
export function DELETE_VEICULOS(data) {
  const token = localStorage.getItem("token");
  return {
    url: API_URL + "delete/veiculos",
    options: {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ placa: data.placa }),
    },
  };
}
export function EDIT_VEICULOS(data) {
  const token = localStorage.getItem("token");
  return {
    url: API_URL + "edit/veiculos",
    options: {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        numVeiculo: data.numVeiculo,
        placa: data.placa,
        modelo: data.modelo,
        ano: data.ano,
        capacidade: data.capacidade,
        dataProxManutencao: data.dataProxManutencao,
        dataUltManutencao: data.dataUltManutencao,
        empresa: data.empresa,
        motorista: data.motorista,
        tipoVeiculo: data.tipoVeiculo,
      }),
    },
  };
}
export function INSERT_ROTA(data) {
  const token = localStorage.getItem("token");
  return {
    url: API_URL + "insert/rota",
    options: {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        localPartida: data.localPartida,
        localChegada: data.localChegada,
      }),
    },
  };
}
export function CREATE_USUARIO(data) {
  const token = localStorage.getItem("token");
  return {
    url: API_URL + "insert/usuario",
    options: {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    },
  };
}
export function GET_USUARIOS(searchTerm) {
  const token = localStorage.getItem("token");
  const url = new URL(API_URL + "usuarios");
  if (searchTerm) {
    url.searchParams.append("search", searchTerm);
  }
  return {
    url: url.toString(),
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  };
}
export function EDIT_USUARIO(data) {
  console.log("🚀 ~ EDIT_USUARIO ~ data:", data);
  const token = localStorage.getItem("token");
  return {
    url: API_URL + "edit/usuario",
    options: {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        cpf: data.cpf,
        nome: data.nome,
        email: data.email,
        status: data.status,
        tipo: data.tipoUsuario,
      }),
    },
  };
}
export function DELETE_USUARIOS(data) {
  const token = localStorage.getItem("token");
  return {
    url: API_URL + "delete/usuario",
    options: {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ cpf: data.cpf }),
    },
  };
}
export function EDIT_STATUS_VEICULO(data, status) {
  const token = localStorage.getItem("token");
  return fetch(API_URL + "edit/status/veiculo", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      placa: data.placa,
      status: status,
    }),
  });
}
export function GET_CEP(cep) {
  const token = localStorage.getItem("token");
  return {
    url: `${API_URL}busca/cep/${cep}`,
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  };
}

export function UPDATE_STATUS_ROTA(data, status, desc) {
  const token = localStorage.getItem("token");
  return {
    url: `${API_URL}edit/status/rota`,
    options: {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        placa: data.veiculo.placa,
        status: status,
        desc: desc,
      }),
    },
  };
}
