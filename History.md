# Project History Log

## [2026-04-23] Authentication, Roles, & Database Initialization
- **Database Architecture:**
  - Created `docker-compose.yml` to spin up a local PostgreSQL 15 database instance.
  - Initialized Prisma ORM (`prisma/schema.prisma`) and created a `User` model with attributes: `id`, `username`, `email`, `password`, and `role` (default: 'USER').
- **Backend API Setup (Express):**
  - Built an Express.js server inside the new `server/` directory running on port 3001.
  - Created authentication routes and controllers (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`).
  - Integrated `bcrypt` for secure password hashing and `jsonwebtoken` (JWT) for session management.
- **Frontend Authentication Flow:**
  - Created an `AuthContext` (`src/context/AuthContext.jsx`) to manage login state and token verification.
  - Implemented UI Pages: `Login.jsx`, `Register.jsx`, and `Settings.jsx`.
  - Upgraded `Topbar.jsx` to conditionally render a User Dropdown menu (Account Settings & Logout) when authenticated, and a "Login" button when unauthenticated.
  - Updated `App.jsx` to wrap the application with the `AuthProvider` and handle rendering of the new pages.
- **Workspace Improvements:**
  - Updated `package.json` dev script to use `concurrently`, allowing `pnpm dev` to run both the Vite frontend and Express backend simultaneously.
  - Successfully resolved Docker Desktop WSL issues and migrated back to **PostgreSQL**.

## [2026-04-23] Username Login & Role-Based Access Control
- **Authentication Updates:**
  - Updated `auth.controller.js` and `Login.jsx` to use **Username** instead of Email for login.
  - Added a toggleable "Eye" icon to `Register.jsx` to show/hide the password.
- **Admin Roles:**
  - Implemented role-based restrictions in `Queue.jsx`.
  - The "Add Queue" form and "Manage Queue" table controls are now only rendered if `user.role === 'ADMIN'`.

## [2026-04-23] Password Recovery System (Forgot/Reset Password)
- **Database Architecture:**
  - Added `resetToken` (String) and `resetTokenExpiry` (DateTime) to the `User` Prisma model to securely track recovery sessions.
- **Backend Flow:**
  - Installed `nodemailer` to handle email dispatch.
  - Created `/api/auth/forgot-password` endpoint to generate a secure random hex token and send an email containing the recovery link.
  - Configured **Ethereal Email** to simulate sending emails without a real SMTP configuration.
  - Created `/api/auth/reset-password` endpoint to validate the token and hash the new password.
- **Frontend Pages:**
  - Added `ForgotPassword.jsx` to request a password reset link.
  - Added `ResetPassword.jsx` to handle the actual password update.
  - Updated `App.jsx` to parse the `?tab=ResetPassword&token=...` URL parameters and navigate to the reset page seamlessly.

## [2026-04-23] UI Updates for Settings and Queue
- **Account Settings (`Settings.jsx`):**
  - Added a "Change Password" (เปลี่ยนรหัสผ่าน) section allowing users to update their password.
  - Implemented `/api/auth/change-password` backend endpoint.
  - Conditionally hid the "Account Status / Role" section for users with the `USER` role.
- **Queue Page (`Queue.jsx`):**
  - Added an input for "Name/Order ID" (ชื่อ/รหัสออเดอร์) to the manual Add Queue form.
  - Added a "Name/Order ID" column to the Live Queue table.

## [2026-04-23] Page Separation & Flow.md Tracking Integration
- **Refactoring UI Architecture:**
  - Extracted UI sections from `App.jsx` into separate Page components: `Home.jsx`, `Service.jsx`, `Queue.jsx`, `About.jsx`, and `Price.jsx`.
  - Simplified `App.jsx` to primarily act as a layout and routing container.
- **Vite Build Fix:**
  - Downgraded `vite` from the invalid `^8.0.0-beta.13` version to `^6.0.0` in `package.json` to resolve `pnpm dev` not launching.
  - Ran `pnpm install` successfully to apply the fix.
- **Flow.md Integration:**
  - Created a local task tracking system (`src/utils/tracker.js`) mimicking the database schema and order flow mentioned in `Flow.md`.
  - Integrated `tracker.js` into `PricingConfigurator.jsx` to log `create_print_job` and `send_facebook_message` when clicking the "Send Order" button.
  - Integrated `tracker.js` into `Queue.jsx` to dynamically load live queue from `localStorage` mock database instead of purely static state.
