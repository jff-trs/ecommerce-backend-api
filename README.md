# 🚀 E-commerce REST API (Backend) | Geração Tec 4.0

API RESTful completa desenvolvida em **Node.js** para o ecossistema de um e-commerce. Este repositório representa a parte de **Backend** de uma entrega dual (integrada com uma aplicação Frontend já concluída) como parte do programa de capacitação **Geração Tec 4.0**, oferecido pelo **IEL** e ministrado pela **Digitall College**.

## 👨‍💻 Autor
- **Jefferson Torres**

---

## 🛠️ Tecnologias e Ferramentas
- **Node.js** & **Express**: Ambiente de execução e framework web para construção das rotas e serviços.
- **Sequelize ORM**: Mapeamento objeto-relacional para comunicação eficiente e segura com o banco de dados.
- **MySQL**: Banco de dados relacional para persistência de entidades.
- **JWT (JSON Web Token)**: Mecanismo robusto de autenticação baseada em tokens para rotas protegidas.
- **Bcrypt**: Criptografia avançada para armazenamento seguro de senhas de usuários.
- **Helmet & CORS**: Camadas adicionais de segurança HTTP e controle de acesso para integrações seguras com o Frontend.

---

## 📁 Arquitetura do Projeto
O projeto segue o padrão de arquitetura **MVC (Model-View-Controller)**, garantindo a separação limpa de responsabilidades entre as regras de banco de dados, controladores de rotas e pontos de entrada, mantendo o código escalável e de fácil manutenção.

---

## ⚙️ Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js instalado na sua máquina.
- Servidor MySQL ativo.

### Passo a passo:

1. **Clone o repositório:**
   ```bash
   git clone <url-do-seu-repositorio>
   cd BackEnd
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   - Duplique o arquivo `.env.example` na raiz e renomeie-o para `.env`.
   - Preencha os campos com as suas credenciais do MySQL e a sua chave secreta do JWT (`JWT_SECRET`).

4. **Execute as Migrations do Banco de Dados:**
   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Inicie o Servidor:**
   ```bash
   node src/app.js
   ```
   *O servidor estará rodando em `http://localhost:3000`*

---

## 📌 Documentação de Endpoints Principais

| Método | Rota | Descrição | Autenticação |
| :--- | :--- | :--- | :--- |
| `POST` | `/v1/auth` | Realiza login e gera o token JWT de acesso | Pública |
| `POST` | `/v1/user` | Cadastra um novo usuário no sistema | Pública |
| `GET` | `/v1/user/:id` | Busca informações do usuário por ID | Pública |
| `PUT` | `/v1/user/:id` | Atualiza dados cadastrais do usuário | 🔒 Protegida (JWT) |
| `DELETE` | `/v1/user/:id` | Remove um usuário do sistema | 🔒 Protegida (JWT) |
| `GET` | `/v1/category/search` | Lista categorias com suporte a paginação e filtros | Pública |
| `GET` | `/v1/category/:id` | Busca detalhes de uma categoria por ID | Pública |
| `POST` | `/v1/category` | Cadastra nova categoria de produtos | 🔒 Protegida (JWT) |
| `GET` | `/v1/product/search` | Pesquisa avançada de produtos (busca por termo, faixa de preço, paginação) | Pública |
| `GET` | `/v1/product/:id` | Busca produto completo por ID (incluindo imagens, opções e categorias) | Pública |
| `POST` | `/v1/product` | Cadastra produto com relações estruturadas | 🔒 Protegida (JWT) |

## 📚 Documentação da API
A documentação interativa da API (Swagger) pode ser acessada localmente após iniciar o servidor através da rota:
👉 `http://localhost:3000/api-docs`

---

## 🏫 Sobre a Formação
Este projeto faz parte das entregas avaliativas do programa **Geração Tec 4.0**, uma iniciativa de fomento tecnológico promovida pelo **IEL** em parceria com a excelência técnica da **Digitall College**.