# Course App — backend

A small Express + MongoDB backend for a course marketplace app. This repo contains the API for users and admins to manage and purchase courses.

## Tech stack

- Node.js (CommonJS)
- Express
- Mongoose (MongoDB)
- JWT for authentication
- bcrypt for password hashing
- zod for request validation
- dotenv for environment variables

## What this repo contains

Key files/folders (backend/):

- `index.js` — app entry point, Express server setup and DB connection
- `config.js` — loads JWT secrets from environment variables
- `db.js` — Mongoose models (User, Admin, Course, Purchase)
- `routes/` — route handlers
  - `user.js` — user signup/signin, purchases
  - `course.js` — list courses and purchase (user)
  - `admin.js` — admin signup/signin and course management
- `middleware/` — authentication middleware for user/admin
- `package.json` — scripts and dependencies

## Requirements

- Node.js (v18+ recommended)
- npm
- MongoDB (Atlas or local)

## Quick start (Windows PowerShell)

1. Install dependencies

```powershell
cd d:\course-app\backend
npm install
```

2. Create a `.env` file in `backend/` with the following variables (see notes about secrets below):

```
# Example .env (do NOT commit real secrets)
MONGODB_URI=your_mongodb_connection_string
JWT_USER_PASSWORD=your_user_jwt_secret
JWT_ADMIN_PASSWORD=your_admin_jwt_secret
PORT=3000
```

3. Run the development server

```powershell
# development (nodemon)
npm run dev

# or run normally
npm start
```

The server listens on the PORT (defaults to 3000 in code). The app mounts endpoints under `/api/v1`.

## Configuration and environment variables

- MONGODB_URI — MongoDB connection string (the project currently contains a hard-coded URI in `index.js`; move that into this env variable)
- JWT_USER_PASSWORD — secret used to sign user JWTs (loaded in `config.js`)
- JWT_ADMIN_PASSWORD — secret used to sign admin JWTs
- PORT — optional server port

Important: Do not commit real credentials. The codebase currently connects to MongoDB in `index.js` with a hard-coded URI — remove any secrets from source and use `MONGODB_URI`.

## API Reference

Base path: /api/v1

Auth: The app uses JWTs. Tokens must be provided in the `token` header (e.g. `token: <jwt>`).

Note: The code uses `req.headers.token` — ensure your client sets that header.

### User routes

- POST /api/v1/user/signup
  - Body (JSON): { name, email, password }
  - Response: { msg: 'signup successful' }

- POST /api/v1/user/signin
  - Body (JSON): { email, password }
  - Response on success: { token }
  - Use the returned token for authenticated requests in the `token` header.

- GET /api/v1/user/purchases
  - Auth: user token
  - Response: { purchases: [...] }

### Course routes

- GET /api/v1/course/preview
  - Public. Returns { courses: [...] }

- POST /api/v1/course/purchase
  - Auth: user token
  - Body (JSON): { courseId }
  - Creates a Purchase document linking user and course.

### Admin routes

- POST /api/v1/admin/signup
  - Body (JSON): { name, email, password }
  - Response: { msg: 'signup successful' }

- POST /api/v1/admin/signin
  - Body (JSON): { email, password }
  - Response: { token }

- POST /api/v1/admin/course
  - Auth: admin token
  - Body (JSON): { title, description, price, imageUrl? }
  - Creates a new course. Responds with { message: 'course created', courseId }

- PUT /api/v1/admin/course
  - Auth: admin token
  - Body (JSON): { courseId, title?, description?, price?, imageUrl? }
  - Updates the course (admin must be the creator)

- DELETE /api/v1/admin/course
  - Auth: admin token
  - Body (JSON): { courseId }
  - Deletes the course if admin is the creator

- GET /api/v1/admin/couse/bulk
  - Auth: admin token
  - Returns courses created by the admin
  - Note: the route path in code is spelled `/couse/bulk` — consider renaming to `/course/bulk` for correctness.

## Database models (summary)

- User: { name, email, password }
- Admin: { name, email, password }
- Course: { title, description, price, imageUrl, creatorId }
- Purchase: { courseId, userId }

All IDs are Mongo ObjectIds via Mongoose.

## Middleware

- `userMiddleware` — verifies JWT using `JWT_USER_PASSWORD`. On success attaches `req.userId`.
- `adminMiddleware` — verifies JWT using `JWT_ADMIN_PASSWORD`. On success attaches `req.adminId`.

Tokens are expected in `req.headers.token`.
