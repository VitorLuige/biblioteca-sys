# BibliotecaSys - Sistema de Gestão de Autores

Projeto final da disciplina de Tópicos Especiais.
Front-end desenvolvido em React que consome a API de teste ReqRes e implementa persistência local para simular um banco de dados real.

## 👨‍🎓 Aluno
[Seu Nome Aqui]

## 🚀 Como rodar o projeto
1. Baixe a pasta e abra no terminal.
2. Instale as dependências:
   `npm install`
3. Rode o projeto:
   `npm run dev`
4. Acesse o link local exibido (geralmente http://localhost:5173).

## ✅ Checklist de Entrega
- [x] Repositório público com README.
- [x] Arquivo .zip anexado.
- [x] CRUD completo: GET / POST / PUT / DELETE funcionando.
- [x] Rotas e filtros por URL implementados.
- [x] Tratamento de status codes e mensagens ao usuário.
- [x] Loading e feedbacks de erro.
- [x] **Diferencial:** Persistência no LocalStorage (Novos cadastros não somem ao atualizar a página).
- [x] **Diferencial:** Dashboard com métricas de consumo da API.

## 🛠 Tecnologias
- React + Vite
- Axios (Requisições HTTP)
- React Router DOM (Navegação)
- CSS Modules (Design System "Glass Dark")

## 🔗 Endpoints Consumidos (ReqRes)
- GET /users (Listagem e Dashboard)
- POST /users (Cadastro)
- PUT /users/:id (Edição)
- DELETE /users/:id (Exclusão)
