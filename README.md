# Portfolio Backend API 🚀

Backend portfolio project built with NestJS featuring realtime AI chat, scalable architecture, background jobs, and websocket streaming.

---

## ✨ Features

- 🔐 Authentication with JWT
- 🤖 AI Chat Assistant integration using Groq
- ⚡ Realtime messaging using Socket.IO
- 📡 Redis Pub/Sub for socket scaling
- 🧵 Background AI processing using BullMQ
- 🗄️ MongoDB database integration
- 🧩 Modular architecture with NestJS
- ✅ Request validation & global error handling
- 📄 Swagger API documentation
- 🌐 REST APIs + WebSocket Gateway

---

# 🏗️ Tech Stack

- Backend Framework: NestJS
- Database: MongoDB
- ODM: Mongoose
- Realtime Communication: Socket.IO
- Queue System: BullMQ
- Cache / PubSub: Redis
- AI Provider: Groq

---

# 🧠 Architecture Overview
# 📂 Project Structure

```txt
├── 📁 src
│   ├── 📁 common
│   │   ├── 📁 Decorators
│   │   │   ├── 📄 Auth.decorator.ts
│   │   │   ├── 📄 authUser.decorator.ts
│   │   │   └── 📄 index.ts
│   │   ├── 📁 Interfaces
│   │   │   ├── 📄 Token.interface.ts
│   │   │   ├── 📄 contact.interface.ts
│   │   │   ├── 📄 education.interface.ts
│   │   │   ├── 📄 email.interface.ts
│   │   │   ├── 📄 experience.interface.ts
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📄 message.interface.ts
│   │   │   ├── 📄 project.interface.ts
│   │   │   ├── 📄 skill.interface.ts
│   │   │   └── 📄 user.interface.ts
│   │   ├── 📁 Repositories
│   │   │   ├── 📄 Base.repository.ts
│   │   │   ├── 📄 contact.repository.ts
│   │   │   ├── 📄 education.repository.ts
│   │   │   ├── 📄 experience.repository.ts
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📄 message.repository.ts
│   │   │   ├── 📄 project.repository.ts
│   │   │   ├── 📄 skill.repository.ts
│   │   │   └── 📄 user.repository.ts
│   │   ├── 📁 Utils
│   │   │   ├── 📁 Hashing
│   │   │   │   └── 📄 hash.service.ts
│   │   │   ├── 📁 crypto
│   │   │   │   └── 📄 crypto.service.ts
│   │   │   ├── 📁 helpers
│   │   │   │   ├── 📄 cursor.helper.ts
│   │   │   │   └── 📄 index.ts
│   │   │   ├── 📁 services
│   │   │   │   ├── 📁 AI
│   │   │   │   │   ├── 📄 ai.module.ts
│   │   │   │   │   ├── 📄 ai.prompt.ts
│   │   │   │   │   └── 📄 ai.service.ts
│   │   │   │   ├── 📁 Jobs
│   │   │   │   │   ├── 📁 AI
│   │   │   │   │   │   ├── 📄 AI.job.module.ts
│   │   │   │   │   │   ├── 📄 AI.job.processor.ts
│   │   │   │   │   │   └── 📄 AI.job.producer.ts
│   │   │   │   │   └── 📁 email
│   │   │   │   │       ├── 📄 email.module.ts
│   │   │   │   │       ├── 📄 email.processor.ts
│   │   │   │   │       └── 📄 email.producer.ts
│   │   │   │   ├── 📁 Tokens
│   │   │   │   │   ├── 📄 token.module.ts
│   │   │   │   │   └── 📄 token.service.ts
│   │   │   │   ├── 📁 mailService
│   │   │   │   │   ├── 📄 mail.module.ts
│   │   │   │   │   └── 📄 mail.service.ts
│   │   │   │   ├── 📁 redis
│   │   │   │   │   ├── 📄 index.ts
│   │   │   │   │   ├── 📄 keys.ts
│   │   │   │   │   └── 📄 redis.ts
│   │   │   │   └── 📄 index.ts
│   │   │   └── 📄 index.ts
│   │   ├── 📁 enum
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📄 jobType.enum.ts
│   │   │   └── 📄 user.enum.ts
│   │   ├── 📁 guards
│   │   │   ├── 📄 authentication.guard.ts
│   │   │   └── 📄 index.ts
│   │   ├── 📁 interceptors
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📄 response.interceptor.ts
│   │   │   └── 📄 timeout.interceptor.ts
│   │   ├── 📁 middlewares
│   │   │   ├── 📄 globalErrFilter.middleware.ts
│   │   │   └── 📄 index.ts
│   │   ├── 📁 models
│   │   │   ├── 📄 contact.model.ts
│   │   │   ├── 📄 education.model.ts
│   │   │   ├── 📄 experience.model.ts
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📄 message.model.ts
│   │   │   ├── 📄 project.model.ts
│   │   │   ├── 📄 skill.model.ts
│   │   │   └── 📄 user.model.ts
│   │   ├── 📄 common.module.ts
│   │   └── 📄 index.ts
│   ├── 📁 modules
│   │   ├── 📁 contact
│   │   │   ├── 📁 Dto
│   │   │   │   ├── 📄 addcontactInfo.dto.ts
│   │   │   │   └── 📄 updateContactInfo.dto.ts
│   │   │   ├── 📄 contact.controller.ts
│   │   │   ├── 📄 contact.module.ts
│   │   │   └── 📄 contact.service.ts
│   │   ├── 📁 education
│   │   │   ├── 📁 Dto
│   │   │   │   ├── 📄 addEducation.dto.ts
│   │   │   │   └── 📄 updateEducation.dto.ts
│   │   │   ├── 📄 education.controller.ts
│   │   │   ├── 📄 education.module.ts
│   │   │   └── 📄 education.service.ts
│   │   ├── 📁 experience
│   │   │   ├── 📁 Dto
│   │   │   │   ├── 📄 addExperience.dto.ts
│   │   │   │   └── 📄 updateExperience.dto.ts
│   │   │   ├── 📄 experience.controller.ts
│   │   │   ├── 📄 experience.module.ts
│   │   │   └── 📄 experience.service.ts
│   │   ├── 📁 gateway
│   │   │   ├── 📁 Dto
│   │   │   │   └── 📄 messageData.dto.ts
│   │   │   ├── 📄 gateway.module.ts
│   │   │   └── 📄 gateway.ts
│   │   ├── 📁 message
│   │   │   ├── 📁 Dto
│   │   │   │   └── 📄 message.dto.ts
│   │   │   ├── 📄 message.controller.ts
│   │   │   ├── 📄 message.service.ts
│   │   │   └── 📄 messsage.module.ts
│   │   ├── 📁 projects
│   │   │   ├── 📁 Dto
│   │   │   │   ├── 📄 addProject.dto.ts
│   │   │   │   ├── 📄 index.ts
│   │   │   │   └── 📄 updateProject.dto.ts
│   │   │   ├── 📄 project.controller.ts
│   │   │   ├── 📄 project.module.ts
│   │   │   └── 📄 project.service.ts
│   │   ├── 📁 skills
│   │   │   ├── 📁 Dto
│   │   │   │   ├── 📄 addSkill.dto.ts
│   │   │   │   └── 📄 updatedSKill.dto.ts
│   │   │   ├── 📄 skill.controller.ts
│   │   │   ├── 📄 skill.module.ts
│   │   │   └── 📄 skill.service.ts
│   │   ├── 📁 user
│   │   │   ├── 📁 Dto
│   │   │   │   ├── 📄 loginData.dto.ts
│   │   │   │   └── 📄 updateUser.dto.ts
│   │   │   ├── 📄 user.controller.ts
│   │   │   ├── 📄 user.module.ts
│   │   │   └── 📄 user.service.ts
│   │   └── 📄 index.ts
│   ├── 📄 app.controller.spec.ts
│   ├── 📄 app.controller.ts
│   ├── 📄 app.module.ts
│   ├── 📄 app.service.ts
│   └── 📄 main.ts

├── ⚙️ .dockerignore
├── ⚙️ .gitignore
├── ⚙️ .prettierrc
├── 🐳 Dockerfile
├── 📝 README.md
├── 📄 Swagger UI.mhtml
├── ⚙️ docker-compose-dev.yml
├── 📄 eslint.config.mjs
├── ⚙️ nest-cli.json
├── ⚙️ package-lock.json
├── ⚙️ package.json
└── ⚙️ tsconfig.json
```


# ⚡ Realtime AI Chat

The AI assistant uses WebSockets for realtime communication and streaming responses.

## Flow

```txt
Client Message
      ↓
Socket Gateway
      ↓
BullMQ Queue
      ↓
Groq AI Processing
      ↓
Redis Pub/Sub
      ↓
Stream Response Back To Client
```


---

# 🚀 Getting Started

## Installation

```bash
git clone <repo-url>

cd project

npm install
```

---

## Environment Variables

Create `.env` file:

```env
PORT=3000

MONGO_URI=

JWT_SECRET=

REDIS_HOST=
REDIS_PORT=

GROQ_API_KEY=
```

---

## Run Development Server

```bash
npm run start:dev
```

---


# 📖 Learning Goals

This project was built to practice and demonstrate:

- Scalable backend architecture
- Realtime systems
- Queue-based processing
- AI integration
- WebSocket communication
- Redis Pub/Sub patterns
- Modular NestJS design

---