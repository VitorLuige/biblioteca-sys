# BibliotecaSys — Gerenciamento de Autores e Editores

Sistema de gerenciamento de conteúdo (CMS) focado no cadastro de autores e colaboradores editoriais. Desenvolvido como projeto final da disciplina de Tópicos Especiais, o sistema opera como uma **Single Page Application (SPA)** moderna, consumindo API externa e implementando estratégias de persistência local.

## 🚀 Visão Geral e Diferenciais

Este projeto vai além de um CRUD básico. Ele implementa uma **Arquitetura Híbrida de Dados**:
1.  **Consumo de API REST:** Conecta-se à API pública `ReqRes` para operações padrão de leitura e escrita.
2.  **Persistência Local (LocalStorage):** Implementa uma camada de "cache local" que permite cadastrar, editar e excluir novos registros de verdade, contornando a limitação da API de teste (que não salva dados permanentemente).
3.  **Dashboard Analítico:** Página inicial com métricas em tempo real sobre o catálogo.

## 🛠 Tecnologias Utilizadas

* **Core:** React.js (Vite)
* **Roteamento:** React Router DOM v6
* **Http Client:** Axios (com tratamento de erros e interceptadores)
* **Estilização:** CSS Moderno com Variáveis (Design System "Glass Dark" com bordas arredondadas e responsividade)
* **Ícones/Avatares:** Integração com UI Avatars API

## ⚙️ Instalação e Execução

Pré-requisitos: Node.js instalado.

1.  Clone ou extraia o projeto.
2.  No terminal, instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
4.  Acesse a aplicação no navegador (geralmente em `http://localhost:5173`).

## 📋 Checklist de Requisitos (Atividade Final)

O projeto atende a 100% dos requisitos solicitados e inclui bônus técnicos.

- [x] **Repositório e Código:** Estrutura organizada, limpa e documentada.
- [x] **CRUD Completo:**
    - **GET:** Listagem paginada unificando dados da API e locais.
    - **POST:** Cadastro funcional com feedback visual e persistência.
    - **PUT:** Edição de registros (tanto da API quanto locais).
    - **DELETE:** Remoção lógica e visual de itens.
- [x] **Rotas e Navegação:** Uso de `react-router-dom` para navegação fluida sem recarregamento.
- [x] **Filtros por URL:** O campo de busca atualiza a URL (`?busca=term`), permitindo compartilhar links de pesquisas específicas.
- [x] **Tratamento de Erros:** Blocos `try/catch` robustos para lidar com falhas de rede ou instabilidade da API externa.
- [x] **Feedback ao Usuário:** Loaders de carregamento, alertas de sucesso/erro e botões desabilitados durante requisições.
- [x] **Bônus / Extra:** Dashboard com cards de métricas.
- [x] **Bônus / Extra:** Persistência de dados no navegador (simulação de banco de dados real).

## 🔗 Endpoints e Integração

O sistema interage com os seguintes endpoints da `https://reqres.in/api`:

| Método | Endpoint       | Função no Sistema |
| :----- | :------------- | :---------------- |
| GET    | `/users`       | Alimentação do Dashboard e Listagem de Autores. |
| POST   | `/users`       | Envio de novos cadastros (com fallback local). |
| PUT    | `/users/:id`   | Atualização de dados de autores existentes. |
| DELETE | `/users/:id`   | Remoção de registro. |

---
