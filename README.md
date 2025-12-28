# 🚀 Projeto Todo — Node + React + SQLite

## 📦 Requisitos
- Node.js 18+ (recomendado 20)
- npm ou pnpm

---

## ⚙️ Configuração

### Frontend
```bash

cd frontend

npm install

cp .env.example .env

No .env, informe a URL do backend:

VITE_API_URL=http://localhost:3000


Backend

cp .env.example .env

Configure o banco (SQLite):

DATABASE_URL="file:./dev.db"

🗄️ Prisma

npm install
npx prisma generate
npx prisma migrate dev

▶️ Executar
Backend

npm run dev

Frontend

