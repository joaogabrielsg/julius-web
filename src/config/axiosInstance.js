import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api-julius.herokuapp.com/',
});

instance.interceptors.response.use(
  response => response,
  error => {
    let message = 'Parece haver um problema com sua conexão. Tente novamente.';
    if (error.response) {
      message =
        error.response.data || 'Ocorreu um erro ao processar a solicitação. Tente novamente.';
      if (error.response.status >= 500) {
        message = 'Ocorreu um erro ao processar a solicitação. Tente novamente.';
      }
    }
    return Promise.reject(message);
  }
);

export default instance;
