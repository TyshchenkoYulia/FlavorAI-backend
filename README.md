# FlavorAI Backend

Backend for FlavorAI – handles authentication, recipe CRUD operations, and database management with Prisma.

## Technologies

- Node.js + TypeScript
- Express.js
- Prisma ORM + PostgreSQL
- JWT Authentication

## Installation

```bash
git clone <backend-repo-url>
cd FlavorAI-backend
npm install
```

## Environment Variables

Create .env in the project root like as .env.example.

## Database Setup

```bash
npx prisma migrate dev --name init
```

## Start Backend

```bash
npm run dev
```

## API Endpoints

```bash
POST    /auth/register  Register a new user
POST    /auth/login     Login and get JWT
```

```bash
POST    /recipes        Create a recipe
GET     /recipes        Get your recipes
GET     /recipes/all    Get other users recipes
DELETE  /recipes/:id    Delete your recipe
```

Note: Authenticated endpoints require JWT in header:

```bash
Authorization: Bearer <JWT_TOKEN>
```
