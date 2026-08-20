# 🏋️ Sistema de Gestão de Alunos

### Teste de Performance 3

#### Arquitetura de Microsserviços com Spring Boot + React

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Spring Cloud](https://img.shields.io/badge/Spring%20Cloud-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apache-maven&logoColor=white)
![Eureka](https://img.shields.io/badge/Eureka-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![OpenFeign](https://img.shields.io/badge/OpenFeign-6DB33F?style=for-the-badge&logo=spring&logoColor=white)

Aplicação distribuída para **gestão de alunos e seus históricos**, desenvolvida utilizando uma arquitetura baseada em **microsserviços** com **Spring Boot** e **Spring Cloud** no back-end e **React** no front-end.

O projeto foi desenvolvido como terceira entrega do TP da disciplina de **Desenvolvimento de Softwares Escaláveis**, com foco na criação de um microsserviço, comunicação entre serviços, descoberta de serviços e utilização de um API Gateway.

---

## 📌 Objetivos

- Incorporar um novo serviço ao modelo de domínio, refletindo a nova arquitetura distribuída.
- Implementar novos endpoints de API REST para o microsserviço.
- Desenvolver o microsserviço utilizando Spring Boot e Spring Cloud.
- Criar repositórios dedicados para gerenciar os dados de cada serviço.
- Integrar os novos serviços à interface React.
- Expandir a cobertura de testes automatizados.

---

## ✅ Funcionalidades

- Cadastro de alunos
- Listagem de alunos
- Busca de aluno por ID
- Edição de alunos
- Remoção de alunos
- Registro automático de histórico
- Consulta do histórico de um aluno
- Comunicação entre microsserviços via Feign
- Descoberta de serviços utilizando Eureka
- Roteamento das requisições através do API Gateway
- Interface web desenvolvida com React

---

## 🏛 Arquitetura

A aplicação utiliza uma arquitetura baseada em **microsserviços**, separando as responsabilidades em aplicações independentes, cada uma com seu próprio banco de dados.

```text
                              ┌───────────────────────┐
                              │        FRONT-END      │
                              │       React :3000     │
                              └───────────┬───────────┘
                                          │
                                          │ HTTP / REST
                                          ▼
                              ┌───────────────────────┐
                              │      API GATEWAY      │
                              │         :8080         │
                              └───────────┬───────────┘
                                          │
                           ┌──────────────┴──────────────┐
                           │                             │
                           ▼                             ▼
                ┌───────────────────────┐     ┌───────────────────────┐
                │   MS-GESTAO-ALUNOS    │     │    MS-HISTORICO       │
                │         :8081         │     │       :8082           │
                └───────────┬───────────┘     └─────────┬─────────────┘
                            │                           │
                            │ Feign                     │
                            │ POST /historico           │
                            └──────────────┬────────────┘
                                           │
                                           ▼
                              ┌───────────────────────┐
                              │        EUREKA         │
                              │         :8761         │
                              │  Service Discovery    │
                              └───────────────────────┘
```

### Descrição dos serviços

| Serviço              | Porta | Responsabilidade                                                     |
| -------------------- | ----- | -------------------------------------------------------------------- |
| **eureka-server**    | 8761  | Registro e descoberta de serviços (Service Discovery)                |
| **api-gateway**      | 8080  | Ponto único de entrada, roteia as requisições para os microsserviços |
| **ms-gestao-alunos** | 8081  | Cadastro, consulta, atualização e exclusão de alunos                 |
| **ms-historico**     | 8082  | Registro e consulta do histórico de alterações dos alunos            |
| **frontend**         | 3000  | Interface web em React consumindo a API via Gateway                  |

---

## 🧩 Modelagem de Domínio

### Domínio

**Health & Fitness** — sistema responsável pelo gerenciamento de alunos de uma academia e do histórico de suas alterações.

### Subdomínios

**Core Domain — Gestão de Alunos**
Responsável pelo cadastro, consulta, atualização e remoção dos alunos.

**Supporting Domain — Histórico**
Responsável por registrar todas as alterações realizadas nos dados dos alunos, permitindo auditoria e rastreabilidade. Extraído como microsserviço independente por possuir baixo acoplamento com o domínio principal e diferentes necessidades de escala e evolução.

### Comunicação entre os bounded contexts

Antes da separação, o histórico era acessado diretamente via relacionamento JPA (`@OneToMany`/`@ManyToOne`). Após a extração em microsserviço, essa referência direta deixou de existir — a comunicação passou a ser feita exclusivamente via **REST**, com o `ms-gestao-alunos` chamando o `ms-historico` através de um client **OpenFeign**, trocando apenas o identificador do aluno (`alunoId`) em vez do objeto completo.

---

## 🛠 Tecnologias

- Java 21
- Spring Boot 4.0.7
- Spring Cloud 2025.1.2
- Spring Web (MVC)
- Spring Data JPA
- Spring Cloud Gateway (Server WebMVC)
- Spring Cloud Netflix Eureka (Server e Client)
- Spring Cloud OpenFeign
- H2 Database
- Maven
- Lombok
- React
- JUnit 5

---

## 📁 Estrutura do Projeto

```text
TP3-Health_Fitness
│
├── eureka-server/                 # Servidor de descoberta de serviços
│   └── src/main/java/br/edu/infnet/eurekaserver/
│
├── api-gateway/                   # Gateway de roteamento
│   └── src/main/java/br/edu/infnet/apigateway/
│       └── config/                # Configuração de CORS
│
├── ms-gestao-alunos/               # Microsserviço de gestão de alunos
│   └── src/main/java/br/edu/infnet/ms_gestao_alunos/
│       ├── client/                # Feign Client para o ms-historico
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       └── models/
│
├── ms-historico/                  # Microsserviço de histórico
│   └── src/main/java/br/edu/infnet/ms_historico/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       └── models/
│
├── frontend/                      # Aplicação React
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## 🔗 Endpoints

### Alunos (`ms-gestao-alunos`, via Gateway em `/alunos`)

| Método | Endpoint       | Descrição             |
| ------ | -------------- | --------------------- |
| GET    | `/alunos`      | Lista todos os alunos |
| GET    | `/alunos/{id}` | Busca aluno por ID    |
| POST   | `/alunos`      | Cadastra um aluno     |
| PUT    | `/alunos/{id}` | Atualiza um aluno     |
| DELETE | `/alunos/{id}` | Remove um aluno       |

### Histórico (`ms-historico`, via Gateway em `/historico`)

| Método | Endpoint               | Descrição                              |
| ------ | ---------------------- | -------------------------------------- |
| GET    | `/historico/{alunoId}` | Lista o histórico de um aluno          |
| POST   | `/historico`           | Registra uma nova entrada de histórico |

---

## 🚀 Como executar

### Pré-requisitos

- Java 21
- Maven
- Node.js e npm

### 1. Clonar o projeto

```bash
git clone https://github.com/LeticiaFAAGomes/TP3-Health_Fitness.git
cd TP3-Health_Fitness
```

### 2. Subir os serviços (nessa ordem)

```bash
# 1. Eureka Server
cd eureka-server
mvn spring-boot:run
```

Aguarde o Eureka iniciar completamente antes de seguir.

```bash
# 2. Microsserviço de Histórico
cd ms-historico
mvn spring-boot:run
```

```bash
# 3. Microsserviço de Gestão de Alunos
cd ms-gestao-alunos
mvn spring-boot:run
```

```bash
# 4. API Gateway
cd api-gateway
mvn spring-boot:run
```

### 3. Subir o Front-end

```bash
cd frontend
npm install
npm start
```

### 4. Acessos

| Serviço                       | URL                              |
| ----------------------------- | -------------------------------- |
| Front-end                     | http://localhost:3000            |
| API Gateway                   | http://localhost:8080            |
| Painel Eureka                 | http://localhost:8761            |
| Console H2 — Gestão de Alunos | http://localhost:8081/h2-console |
| Console H2 — Histórico        | http://localhost:8082/h2-console |

---

## 🧪 Testes

Foram desenvolvidos testes automatizados para validar a camada de persistência de cada microsserviço, utilizando `@DataJpaTest` com banco H2 em memória.

### ms-gestao-alunos

`src/test/java/br/edu/infnet/ms_gestao_alunos/aluno/AlunoTest.java`

| Teste                                      | Cenário                                                                           |
| ------------------------------------------ | --------------------------------------------------------------------------------- |
| `deveSalvarAlunoQuandoDadosForemValidos`   | Salva um aluno e confirma que o ID foi gerado e os dados persistidos corretamente |
| `deveBuscarAlunoPorIdQuandoAlunoExistir`   | Busca um aluno pelo ID e confirma que os dados retornados batem                   |
| `deveListarTodosAlunosQuandoAlunosExistem` | Salva múltiplos alunos e confirma que todos aparecem na listagem                  |
| `deveAtualizarAlunoQuandoAlunoExistir`     | Atualiza um campo do aluno e confirma que a alteração foi persistida              |
| `deveExcluirAlunoQuandoAlunoExistir`       | Remove um aluno e confirma que ele deixa de existir no repositório                |

---

## 📜 Histórico de Alterações

Toda operação realizada sobre um aluno gera automaticamente um registro de histórico, através da comunicação Feign entre `ms-gestao-alunos` e `ms-historico`.

| Operação    | Registro gerado            |
| ----------- | -------------------------- |
| Cadastro    | Aluno cadastrado           |
| Atualização | Dados do aluno atualizados |
| Exclusão    | Aluno removido             |

Cada registro armazena:

- `alunoId`
- `descricao`
- `data`

---

## 👩‍💻 Autora

**Letícia Gomes**

Projeto desenvolvido para a disciplina **Desenvolvimento de Softwares Escaláveis**, aplicando conceitos de uma arquitetura baseada em microsserviços com Spring Boot e Spring Cloud no back-end e React no front-end, Domain-Driven Design (DDD), Spring Data JPA, persistência de dados e testes.

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT**.
