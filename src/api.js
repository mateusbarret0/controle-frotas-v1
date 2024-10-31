export const API_URL = 'http://localhost:8000/api/'

export function GET_VEICULOS() {
    const token = localStorage.getItem('token'); 
    return {
      url: API_URL + `veiculos`,
      options: {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', 
          Accept: 'application/json' 
        },
      },
    };
  }
export function GET_ROTAS() {
    const token = localStorage.getItem('token'); 
    return {
      url: API_URL + `get/rotas`,
      options: {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', 
          Accept: 'application/json' 
        },
      },
    };
  }
  export function CREATE_VEICULOS(data) {
    const token = localStorage.getItem('token'); 
    return {
      url: API_URL + 'insert/veiculos',
      options: {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data), 
      },
    };
  }
  export function DELETE_VEICULOS(data) {
    const token = localStorage.getItem('token'); 
    return {
      url: API_URL + 'delete/veiculos',
      options: {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ placa: data.placa }),
      },
    };
  }
  export function EDIT_VEICULOS(data) {
    const token = localStorage.getItem('token');
    return {
      url: API_URL + 'edit/veiculos',
      options: {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
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
    const token = localStorage.getItem('token');
    return {
      url: API_URL + 'insert/rota',
      options: {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          localPartida: data.localPartida,
          localChegada: data.localChegada,
        }),
      },
    }
  }
    export function CREATE_USUARIO(data) {
      const token = localStorage.getItem('token'); 
      return {
        url: API_URL + 'insert/usuario',
        options: {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(data), 
        },
      };
    }
    export function GET_USUARIOS() {
      const token = localStorage.getItem('token'); 
      return {
        url: API_URL + `usuarios`,
        options: {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', 
            Accept: 'application/json' 
          },
        },
      };
    }
    export function EDIT_USUARIO(data) {
      console.log("🚀 ~ EDIT_USUARIO ~ data:", data)
      const token = localStorage.getItem('token');
      return {
        url: API_URL + 'edit/usuario',
        options: {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
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
      const token = localStorage.getItem('token'); 
      return {
        url: API_URL + 'delete/usuario',
        options: {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ cpf: data.cpf }),
        },
      };
    }
