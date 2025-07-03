# Rick and Morty API Favorites

Uma API REST desenvolvida com NestJS e Prisma que permite aos usuários registrar, autenticar e salvar até 3 personagens favoritos da API do Rick and Morty.

## 🔧 Tecnologias

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/)
- [JWT](https://jwt.io/)
- [Swagger](https://swagger.io/)
- [Axios](https://axios-http.com/)

## 🚀 Como rodar localmente

```bash
# Clone o repositório
git clone git@github.com:lpittoli/rick-api.git
cd rick-api

# Instale as dependências
npm install

# Configure o banco de dados
npx prisma migrate dev --name init

# Rode a aplicação
npm run start:dev
```

## 🔐 Autenticação

- Registro de usuário: `POST /auth/register`
- Login e obtenção de token: `POST /auth/login`
- Utilize o token JWT para acessar rotas protegidas (`Bearer TOKEN`)

## 📚 Documentação da API

Acesse `http://localhost:3000/api` para visualizar e testar os endpoints com Swagger.

## 🧪 Funcionalidades

- Criar conta de usuário
- Fazer login e obter JWT
- Adicionar até 3 favoritos
- Listar, atualizar e remover favoritos
- Ver episódios únicos de favoritos

## 📁 Estrutura

```
src/
├── auth/
├── favorites/
├── characters/
├── prisma/
└── users/
```

## 📝 Licença

Este projeto está sob a licença MIT.
