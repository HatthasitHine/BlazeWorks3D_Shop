# 📦 3D Printing Order System — AI Agent Instruction Spec

## 🎯 Objective
Build a backend system for a React-based web app that:
- Allows users to upload 3D files (STL/OBJ)
- Calculates price
- Creates print orders
- Sends order details to Facebook Messenger
- Tracks job status

---

# 🧠 SYSTEM ARCHITECTURE

Frontend (React) → Backend (Node.js API) → PostgreSQL → Facebook API

---

# 📁 PROJECT STRUCTURE

```
src/
 ├── controllers/
 │    ├── auth.controller.js
 │    ├── user.controller.js
 │    ├── printJob.controller.js
 │    ├── upload.controller.js
 │    └── facebook.controller.js
 │
 ├── services/
 │    ├── auth.service.js
 │    ├── user.service.js
 │    ├── printJob.service.js
 │    ├── pricing.service.js
 │    ├── file.service.js
 │    └── facebook.service.js
 │
 ├── routes/
 │    ├── auth.routes.js
 │    ├── user.routes.js
 │    ├── printJob.routes.js
 │    └── upload.routes.js
 │
 ├── prisma/
 │    └── schema.prisma
 │
 ├── utils/
 │    ├── logger.js
 │    ├── tracker.js
 │    └── validator.js
 │
 ├── middlewares/
 │    ├── auth.middleware.js
 │    └── error.middleware.js
 │
 └── app.js
```

---

# 🗄️ DATABASE SCHEMA (PRISMA)

```
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())

  printJobs PrintJob[]
}

model PrintJob {
  id             Int      @id @default(autoincrement())
  userId         Int
  fileUrl        String
  material       String
  color          String?
  infill         Int
  note           String?
  estimatedPrice Float
  status         String
  createdAt      DateTime @default(now())

  user User @relation(fields: [userId], references: [id])
}

model PriceLog {
  id        Int      @id @default(autoincrement())
  printJobId Int
  volume    Float
  cost      Float
  createdAt DateTime @default(now())
}

model FbMessage {
  id         Int      @id @default(autoincrement())
  printJobId Int
  status     String
  createdAt  DateTime @default(now())
}
```

---

# 🔄 SYSTEM FLOW

## 1. USER FLOW

1. Register / Login
2. Upload file
3. Select material & settings
4. Request price calculation
5. Confirm order
6. Send to Facebook

---

## 2. PRICE CALCULATION FLOW

```
Input: file + settings
→ Extract volume
→ Calculate material cost
→ Estimate print time
→ Return total price
```

---

## 3. ORDER FLOW

```
Create PrintJob
→ Save to DB
→ Send Facebook message
→ Log message result
```

---

# 🔌 API ENDPOINTS

## Auth
- POST /auth/register
- POST /auth/login

## User
- GET /user/profile

## Upload
- POST /upload

## Pricing
- POST /calculate-price

## Print Job
- POST /print-job
- GET /print-jobs

## Facebook
- POST /send-to-facebook

---

# 🧠 TASK TRACKING SYSTEM (IMPORTANT)

## Goal
Allow AI Agent to check what has already been done.

---

## tracker.js

Responsibilities:
- Log every completed task
- Prevent duplicate execution

---

### Data Structure

```
tasks
- id
- name
- status (pending, done)
- created_at
```

---

### Example Usage

```
if (tracker.isDone("create_print_job")) {
  skip
} else {
  doTask()
  tracker.markDone("create_print_job")
}
```

---

## Recommended Implementation

Option 1: In-memory (dev)
Option 2: Database table (production)

---

# 🧩 AI AGENT INSTRUCTIONS

## Rules
1. Always check tracker before executing any task
2. Never duplicate DB writes
3. Log every important action
4. Use services layer for logic
5. Keep controllers thin

---

## Execution Order

1. Setup database
2. Setup Prisma
3. Build Auth
4. Build Upload
5. Build Pricing
6. Build Print Job
7. Integrate Facebook

---

# ⚠️ CONSTRAINTS

- Do NOT connect React directly to DB
- Use environment variables for secrets
- Validate all inputs
- Handle errors globally

---

# 🚀 OPTIONAL EXTENSIONS

- Admin dashboard
- Order status tracking
- Notification system
- File analysis microservice

---

# ✅ DONE CONDITION

System is complete when:
- User can create order
- Price is calculated
- Order is stored
- Facebook message is sent
- Task tracker logs execution

---

# 📌 END OF SPEC

