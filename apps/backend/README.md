## IF Backend

<p align="center">
<a  href="https://github.com/lbs-luis/InsightFinder/tree/main/apps/frontend">Readme do Frontend</a> | <a  href="https://github.com/lbs-luis/InsightFinder">Voltar para a Raiz</a>
</p>

<br>

Bem-vindo ao backend do projeto Insight Finder AI. Esta API, construída com NestJS, é responsável pela coleta de notícias e por servir os dados para o frontend.

Tecnologias Principais

    NestJS: Framework Node.js para a API RESTful.

    PostgreSQL: Banco de dados relacional que roda em um contêiner Docker.

    Prisma: ORM para gerenciar o esquema e as migrações do banco de dados.

    Coletor RSS: Serviço assíncrono para buscar notícias de fontes homologadas.

##

### Como Rodar o Projeto

Para rodar o projeto, você precisa ter Docker Compose e pnpm (ou npm) instalados.

1.  Variáveis de Ambiente

        Crie um arquivo .env na raiz do backend (/apps/backend) e configure as variáveis,
        usando o arquivo .env.example como modelo.

2.  Iniciar o Banco de Dados

        Na raiz do backend (/apps/backend), inicie o contêiner do PostgreSQL.
        - docker compose up -d

3.  Instalar e Inicializar

        Na pasta /apps/backend, instale as dependências e execute as migrações e o seed.

        1. cd apps/backend
        2. pnpm install # ou npm install
        3. pnpm db:init # ou npm run db:init

O comando db:init irá criar a base de dados e popular as tabelas com as fontes homologadas (G1 e Le Monde), ambas na categoria "Política".

4. Coleta de Notícias

O serviço de coleta está agendado para rodar a cada hora. Para testes, você pode acionar a coleta manualmente via:

    GET: http://localhost:3001/collector/run.

5. Iniciar

Para executar a api após seguir os passos anteriores basta executar o comando:

    pnpm start:dev # ou npm run start:dev
