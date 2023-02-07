

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

 <p align = "center">
   <img src="https://img.shields.io/badge/author-Samer Valente-4dae71?style=flat-square" />
  <img src="https://img.shields.io/badge/project-Register Clients API-orange?style=flat-square" />
</p>

##  :clipboard: Descrição

Uma API REST para cadastro e visualização de clientes.

## :computer:	 Tecnologias e Conceitos

- REST APIs
- Typescript
- Node.js
- NestJS
- PrismaORM
- PostgreSQL
- MVC Architecture
- In Memory Database
- Docker
- Jest e Supertest

***

## 🏁 Rodando a aplicação
Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/samervalente/register-clients-api
```
Em seguida, certifique-se se sua instância do postgresql esteja ativa

```bash
# verifique o status
$ sudo service postgresql status

# caso não esteja ativa, use:
$ sudo service postgresql start
```

## 💻 Rodando na máquina local

```bash

# instale as dependências
$ npm install

# crie um arquivo .env e insira
DATABASE_URL="postgresql://${USER}:${PASSWORD}@localhost:5432/register-clients-db"

# inicie a aplicação
$ npm start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# utilize a url para realizar as chamadas http
http://localhost:4000/clients
```

## 🐳 Rodando no Docker

```bash
# crie um arquivo .env e troque os valores pelas suas credenciais
DATABASE_URL="postgresql://${USER}:${PASSWORD}@pg-register-clients:5432/register-clients-db"
POSTGRES_DATABASE=register-clients-db
POSTGRES_USER=
POSTGRES_PASSWORD=

# inicie a aplicação
$ docker-compose up --build
```
## 🌱 Seed
Caso vocẽ queira popular o banco com vários dados pré-existentes (como por exemplo para testar a paginação), faça o seed para não ter que criar vários clientes manualmente. Observação: caso você tenha optado por rodar aplicação com docker, o comando de seed é executado automaticamente.

```bash
$ npx prisma db seed

```


## Tests
Cada suíte de teste utiliza um schema identificado por um identificador único (uuid) do próprio banco de dados antes criado, o que não afeta nosso banco principal e remove a necessidade de criar um outro banco e docker-compose para testes.

Além disso, nossos testes unitários utilizam o conceito de in memory database, onde os dados estão armazenados na memória principal ao invés de estar em discos rígidos como ocorre na maior parte dos casos. In memory database também remove a necessidade de utilização de mockagem e oferece uma maior flexibilidade.

## 🧪 Testes na máquina local

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## 🧪 Testes com docker

```bash
# unit tests
$ docker exec -it register-clients-app npm run test

# e2e tests
$ docker exec -it register-clients-app npm run test:e2e
```

***

## :rocket: Rotas

    
```yml 
POST /clients
    - Rota para registrar um novo cliente
    - headers: {}
    - body: {
    "name": "Filipe Valente",
    "cpf": "123.456.789-10",
    "birthDate": "19/10/1999"
    }
```
    
```yml 
GET /clients
    - Rota para listar todos os clientes
    - headers: {}
    - body: {}
```

```yml
GET /clients?page=2&limit=5
    - Rota para listar um grupo específico de clientes através da paginação
    - headers: {}
    - body: {}
``` 

```yml
GET /clients/:cpf 
    - Rota para listar um cliente específico pelo CPF
    - headers: {}
    - body: {}
```

***


