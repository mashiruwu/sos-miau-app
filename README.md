<p align="center">
  <img src="https://img.shields.io/github/repo-size/mashiruwu/sos-miau-app?style=flat-square" />
  <img src="https://img.shields.io/github/contributors/mashiruwu/sos-miau-app?style=flat-square" />
  <img src="https://img.shields.io/badge/Node.js-20%2B-brightgreen?style=flat-square&logo=nodedotjs" />
  <img src="https://img.shields.io/badge/React-Frontend-blue?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/Express-Backend-lightgrey?style=flat-square&logo=express" />
  <img src="https://img.shields.io/badge/Firebase-Functions-FFCA28?style=flat-square&logo=firebase" />
</p>

# 🐾 SOS Miau

## 📝 Descrição

A **SOS Miau** é uma aplicação web dedicada ao resgate, reabilitação e adoção responsável de gatinhos em situação de vulnerabilidade. Nosso compromisso é oferecer uma segunda chance a felinos abandonados, conectando-os a lares seguros e amorosos.

O projeto conta com um sistema de **"match"** entre adotantes e gatos, além de um **portal de transparência para doações**.

---

## ✨ Funcionalidades

- **Match com Miau:** Interface intuitiva inspirada no Tinder para usuários darem "like" em gatinhos e iniciarem o processo de adoção.
- **Cadastro de Adotantes e ONGs:** Sistema de registro e login seguro para usuários e organizações parceiras.
- **Gestão de Gatos:** Administradores podem cadastrar, editar e remover informações dos gatos disponíveis para adoção.
- **Portal de Transparência:** Visualização de relatórios de doações para garantir total transparência.
- **Adoção Responsável:** Processo estruturado para verificação da elegibilidade do adotante, priorizando o bem-estar dos animais.

---

## 📂 Estrutura do Projeto

O projeto é organizado como um **monorepo**:

```
/
├── api/                      # Backend com Node.js e Express
├── functions/               # Firebase Functions (configurações e handlers)
├── sprints/documentation/   # Documentação (user stories, checklist de usabilidade, etc.)
└── (raiz)                   # Frontend com React e Vite
```

---

## 🚀 Instalação e Execução

### ✅ Pré-requisitos

- Node.js (versão 20 ou superior)
- npm ou yarn

### 🔧 Passo a passo

1. **Clone o repositório**

```bash
git clone https://github.com/mashiruwu/sos-miau-app.git
cd sos-miau-app
```

2. **Configure o Backend**

```bash
cd api
npm install
```

- Crie o arquivo `credentials.json` com suas credenciais de serviço do Firebase.
- Crie um arquivo `.env` (pode usar `.env.example` como base) com as variáveis necessárias (ex: chave JWT).

3. **Configure o Frontend**

```bash
cd ..
npm install
```

4. **Execute a aplicação**

- Backend:
```bash
cd api
npm start
```

- Frontend (em novo terminal):
```bash
cd ..
npm run dev
```

Acesse a aplicação em [http://localhost:5173](http://localhost:5173)

---

## 📜 Scripts Disponíveis

### Frontend (Raiz)

| Comando | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o Vite com Hot-Reload |
| `npm run build` | Compila o projeto para produção |
| `npm run lint` | Executa o ESLint |
| `npm run test` | Roda os testes automatizados com Vitest |
| `npm run preview` | Visualiza a build de produção |

### Backend (`/api`)

| Comando | Descrição |
|--------|-----------|
| `npm start` | Inicia o servidor da API |

---

## ⚙️ Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/adopter` | Cria um novo adotante |
| GET | `/api/adopter` | Lista todos os adotantes |
| PUT | `/api/adopter/:id` | Atualiza um adotante |
| POST | `/api/cat` | Adiciona um novo gato |
| GET | `/api/cat` | Lista todos os gatos |
| PUT | `/api/cat/:id` | Atualiza um gato |
| DELETE | `/api/cat/:id` | Remove um gato |
| POST | `/api/donor-ong` | Cria doador (ONG) |
| POST | `/api/donor-person` | Cria doador (Pessoa Física) |
| POST | `/api/match` | Cria um match entre adotante e gato |
| GET | `/api/match` | Lista todos os matches |
| GET | `/api/report/donations` | Gera relatório de doações |

---

## 🤝 Contribuição

Contribuições são muito bem-vindas!

1. Faça um fork do repositório.
2. Crie uma nova branch:

```bash
git checkout -b feature/sua-feature
```

3. Faça suas alterações e commit:

```bash
git commit -m "Adiciona nova feature"
```

4. Envie para o GitHub:

```bash
git push origin feature/sua-feature
```

5. Abra um **Pull Request** com uma descrição clara da mudança.

---

> Feito com ❤️ pela equipe **SOS Miau**
