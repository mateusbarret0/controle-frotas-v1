export const API_URL = 'http://localhost:8000/api/'

export function GET_VEICULOS() {
    const token = localStorage.getItem('token'); 
    return {
      url: API_URL + 'veiculos',
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