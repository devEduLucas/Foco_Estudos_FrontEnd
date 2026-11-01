# Foco nos Estudos — Front-end

Aplicação web desenvolvida com **React e TypeScript** para gerenciamento e organização da rotina de estudos.

A plataforma oferece uma interface para acompanhar tarefas, organizar matérias, visualizar prazos e monitorar o progresso semanal, consumindo uma API REST desenvolvida com Java e Spring Boot.

## Tecnologias

- **React 19** — construção de interfaces.
- **TypeScript** — tipagem estática.
- **Vite** — ferramenta de desenvolvimento e build.
- **Axios** — comunicação HTTP com a API REST.
- **React Router DOM** — gerenciamento de rotas.
- **Lucide React** — biblioteca de ícones.
- **CSS Modules** — estilização e encapsulamento de estilos.
- **Inter** — tipografia da interface.

## Funcionalidades

### Autenticação
- Tela de login.
- Cadastro de usuários.
- Integração com autenticação JWT.
- Armazenamento e gerenciamento da sessão.
- Proteção de rotas privadas.
- Redirecionamento para autenticação quando a sessão é inválida ou expirada.

### Visão geral (Dashboard)
- Indicadores de acompanhamento das tarefas.
- Visualização das atividades do dia.
- Exibição dos próximos prazos.
- Resumo semanal.
- Criação rápida de novas tarefas.

### Gerenciamento de matérias
- Cadastro de matérias.
- Listagem das matérias cadastradas.
- Pesquisa e filtragem.
- Edição de informações.
- Exclusão com confirmação.
- Integração com o gerenciamento de tarefas.

### Gerenciamento de tarefas
- Cadastro de tarefas.
- Edição e exclusão.
- Atualização do status de conclusão.
- Filtros por matéria, status, prioridade e prazo.
- Organização das atividades.
- Integração com as matérias cadastradas.

### Calendário
- Visualização mensal de atividades.
- Navegação entre meses.
- Identificação de tarefas por data.
- Visualização dos próximos compromissos.
- Acesso às informações das tarefas diretamente pelo calendário.

## Arquitetura e integração

A aplicação utiliza uma arquitetura baseada em componentes, separando páginas, elementos reutilizáveis, serviços de comunicação com a API e gerenciamento de autenticação.

```text
          React + TypeScript
                  |
                  v
             React Router
                  |
                  v
              Pages
                  |
                  v
             Components
                  |
                  v
              Services
                  |
                  v
             Axios HTTP
                  |
                  v
             API REST
           Spring Boot
                  |
                  v
                MySQL
```

A comunicação entre o front-end e o back-end é realizada por meio de requisições HTTP utilizando Axios.

O token JWT é incluído automaticamente nas requisições protegidas por meio de interceptors do Axios.

## Estrutura do projeto

```text
Foco_Estudos_FrontEnd/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── calendario/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   ├── materias/
│   │   ├── tarefas/
│   │   └── ui/
│   │
│   ├── hooks/
│   │
│   ├── pages/
│   │
│   ├── services/
│   │
│   ├── styles/
│   │
│   ├── types/
│   │
│   ├── utils/
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── .env.example
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Como executar o projeto

### Pré-requisitos

- Node.js.
- npm.
- Git.
- Back-end do Foco nos Estudos em execução.

### 1. Clonar o repositório

```bash
git clone https://github.com/devEduLucas/Foco_Estudos_FrontEnd.git

cd Foco_Estudos_FrontEnd
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto.

Adicione a URL da API:

```env
VITE_API_URL=http://localhost:8080/api
```

Essa variável define o endereço utilizado pelo Axios para realizar as requisições HTTP.

**Importante:** não coloque senhas, chaves JWT ou outras informações secretas nas variáveis `VITE_`, pois elas ficam disponíveis no código entregue ao navegador.

### 4. Executar a aplicação

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o ambiente de desenvolvimento |
| `npm run build` | Verifica os tipos TypeScript e gera a build |
| `npm run lint` | Executa a análise estática do código |
| `npm run preview` | Executa uma prévia da build de produção |

## Rotas da aplicação

| Rota | Descrição | Acesso |
|---|---|---|
| `/entrar` | Login | Público |
| `/cadastro` | Cadastro de usuário | Público |
| `/` | Visão geral | Autenticado |
| `/materias` | Gerenciamento de matérias | Autenticado |
| `/tarefas` | Gerenciamento de tarefas | Autenticado |
| `/calendario` | Calendário de atividades | Autenticado |

## Integração com o Back-end

O front-end depende da API REST desenvolvida em Java e Spring Boot.

**Repositório Back-end:**  
https://github.com/devEduLucas/Foco_Estudos_BackEnd

Para utilizar todas as funcionalidades, inicie primeiro a API e configure corretamente a variável `VITE_API_URL`.

## Objetivos técnicos

- Desenvolvimento de interfaces com React.
- Aplicação de TypeScript.
- Criação de componentes reutilizáveis.
- Gerenciamento de rotas públicas e privadas.
- Integração com APIs RESTful.
- Comunicação HTTP utilizando Axios.
- Autenticação e gerenciamento de sessão com JWT.
- Gerenciamento de estados.
- Organização e reutilização de componentes.
- Desenvolvimento de interfaces responsivas.

---

Desenvolvido por **Eduardo Lucas**.

[GitHub](https://github.com/devEduLucas)
