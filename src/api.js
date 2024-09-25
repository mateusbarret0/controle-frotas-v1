export const API_URL = 'http://localhost:3000/'

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
  export function CREATE_VEICULOS() {
    const token = localStorage.getItem('token'); 
    return {
      url: API_URL + 'insert/veiculos',
      options: {
        method: 'POST', // Alterado para 'POST' para enviar dados
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', 
          Accept: 'application/json' 
        },
      },
    };
  }