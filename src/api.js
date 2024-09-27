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
        body: JSON.stringify(data),  // Enviar os dados no corpo da requisição
      },
    };
  }