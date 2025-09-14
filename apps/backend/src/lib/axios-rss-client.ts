import axios from 'axios';

const axiosRssClient = axios.create({
  headers: {
    'Content-Type': 'application/xml; charset=utf-8',
    'User-Agent':
      'InsightFinderAI-Collector/1.0.0 (NestJS; +https://www.insightfinder.com)',
    Accept: 'application/rss+xml, application/xml, text/xml, text/html',
  },
  timeout: 5000, // 5s
});

axiosRssClient.interceptors.request.use(
  (config) => {
    // console.log(`Iniciando requisição para: ${config.url}`);
    return config;
  },
  (error) => {
    if (error instanceof Error) {
      return Promise.reject(new Error(error.message));
    }
    return Promise.reject(new Error('Erro inesperado na requisição: ' + error));
  },
);

axiosRssClient.interceptors.response.use(
  (response) => {
    // console.log(`Resposta recebida de: ${response.config.url}`);
    return response;
  },
  (error) => {
    // Opcional: Lógica para tratar erros de forma global, por exemplo
    // if (error.response && error.response.status === 404) {
    //   // Tratar 404 de forma específica
    // }
    if (error instanceof Error) {
      return Promise.reject(new Error(error.message));
    }
    return Promise.reject(new Error('Erro inesperado na resposta: ' + error));
  },
);

export default axiosRssClient;
