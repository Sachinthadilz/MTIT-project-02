# Aetheris Note Management System

A full-stack, production-ready MERN (MongoDB, Express, React, Node.js) Note Management Application. This project features a clean architecture, robust JWT-based security, a premium user interface using Tailwind CSS and Framer Motion, and follows enterprise-level software design patterns.

## 1. Project Overview
Aetheris is a secure, user-centric note-taking platform designed to help users organize their thoughts with peace of mind. It separates business logic from views across the entire stack, yielding a highly scalable, easily maintainable codebase.

## 2. Features
- **Secure Authentication**: Register and Login functionality utilizing `bcrypt` password hashing and stateless JSON Web Tokens (JWT).
- **Protected Routing**: Both backend API endpoints and frontend React views are protected against unauthorized access.
- **Full CRUD Operations**: Create, Read, Update, and Delete notes.
- **Strict Data Ownership**: Backend middleware actively ensures users can only query, modify, or delete notes that belong exclusively to them.
- **Premium User Interface**: Features glassmorphism, fluid CSS animations, dynamic modals, and responsive mobile-first layouts using Tailwind CSS.
- **Clean Architecture**: Utilizes Custom Hooks and API Service layers on the frontend, and central middlewares with `express-async-handler` on the backend.

## 3. Tech Stack
### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB & Mongoose ORM
- **Security**: JWT (`jsonwebtoken`), `bcryptjs`, `helmet`, `express-rate-limit`, `cors`
- **Utilities**: `express-async-handler`, `express-validator`

### Frontend
- **Framework**: React (Bootstrapped with Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM (v6)
- **State/Network**: Custom React Hooks + Axios
- **Icons & Alerts**: `react-icons`, `react-toastify`

---

## 4. Architecture Overview
### Backend Architecture
The Express API follows a strict MVC-inspired layered architecture:
- **Routers**: Map HTTP endpoints to Controller methods.
- **Validation**: Centralized `express-validator` schemas define input strictness before hitting controllers.
- **Middlewares**: Handles global concerns like Error Formatting, JWT validation (`protect`), and Authorization (`checkNoteOwnership`).
- **Controllers**: Wrapped in `express-async-handler`, they contain pure business logic communicating exclusively with Mongoose models.

### Frontend Architecture
The React application decouples presentation from data fetching:
- **Service Layer**: Pure JavaScript functions (`authService.js`, `noteService.js`) encapsulate raw Axios configuration.
- **Custom Hooks**: Abstractions like `useNotes.js` consume the service layer and manage local React State, loading variables, and Toast notifications.
- **Presentation Components**: UI components (like `Home.jsx`) simply consume the hooks and render the JSX, remaining completely oblivious to network implementations.

---

## 5. Folder Structure (Backend)
```text
backend/
├── src/
│   ├── app.js                          # Express app entry & config
│   ├── config/
│   │   └── db.js                       # MongoDB connection logic
│   ├── controllers/
│   │   ├── authController.js           # Auth business logic
│   │   └── noteController.js           # Note CRUD business logic
│   ├── middlewares/
│   │   ├── authMiddleware.js           # JWT verification
│   │   ├── errorMiddleware.js          # Global error formatter
│   │   ├── ownershipMiddleware.js      # Note ownership validation
│   │   └── validationMiddleware.js     # express-validator schemas
│   ├── models/
│   │   ├── Note.js                     # Mongoose Note Schema
│   │   └── User.js                     # Mongoose User Schema
│   └── routes/
│       ├── authRoutes.js               # Auth endpoint definitions
│       └── noteRoutes.js               # Note endpoint definitions
├── .env                                # Environment variables
└── package.json
```

## 6. Folder Structure (Frontend)
```text
frontend/
├── src/
│   ├── api/
│   │   └── axios.js                    # Base Axios instance & Interceptors
│   ├── services/
│   │   ├── authService.js              # Auth API wrappers
│   │   └── noteService.js              # Note API wrappers
│   ├── hooks/
│   │   ├── useAuth.js                  # AuthContext consumer hook
│   │   └── useNotes.js                 # Notes state & fetching logic
│   ├── context/
│   │   └── AuthContext.jsx             # Global Authentication State
│   ├── components/
│   │   ├── auth/                       # Login.jsx, Register.jsx
│   │   ├── landing/                    # Hero, Features, Testimonials
│   │   ├── layout/                     # Header, Spinner
│   │   └── notes/                      # Modals, NoteForm, NoteItem
│   ├── pages/
│   │   ├── Home.jsx                    # Dashboard Presentation View
│   │   ├── Landing.jsx                 # Marketing Page
│   │   └── NotFound.jsx                # 404 Page
│   ├── App.jsx                         # Root Router
│   ├── index.css                       # Tailwind + Global Animations
│   └── main.jsx                        # React DOM Entry
├── index.html
├── tailwind.config.js
└── package.json
```

---

## 7. API Endpoints

### Authentication `/api/auth`
| Method | Endpoint    | Description             | Access  |
| ------ | ----------- | ----------------------- | ------- |
| POST   | `/register` | Register a new user     | Public  |
| POST   | `/login`    | Authenticate user & get token | Public |
| GET    | `/me`       | Get current user data   | Private |

### Notes `/api/notes`
| Method | Endpoint    | Description                 | Access  |
| ------ | ----------- | --------------------------- | ------- |
| GET    | `/`         | Get all notes for auth user | Private |
| POST   | `/`         | Create a new note           | Private |
| PUT    | `/:id`      | Update a note (must own)    | Private |
| DELETE | `/:id`      | Delete a note (must own)    | Private |

---

## 8. Authentication Flow
1. **Login/Register**: User submits credentials. Backend validates, hashes password (if registering), and responds with a signed JWT.
2. **Token Storage**: Frontend `AuthContext` receives the token and stores it in `localStorage`.
3. **Axios Interceptor**: Future API requests utilize the `api/axios.js` interceptor which automatically injects `Authorization: Bearer <token>` into the headers.
4. **Backend Protection**: Incoming requests hit the `protect` middleware. If the token is valid, `req.user` is populated. If invalid, a `401 Unauthorized` is seamlessly tossed to the global error handler.

---

## 9. Installation Guide
Ensure you have Node.js (v18+) and MongoDB installed locally, or a remote MongoDB Atlas URI.

1. **Clone the repository**
2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```
3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## 10. Environment Variables
### Backend (`backend/.env`)
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=30d
```

## 11. Running Locally
You will need two terminal windows to run the application concurrently.

**Terminal 1 (Backend Server)**:
```bash
cd backend
npm run server  # Starts nodemon on port 5000
```

**Terminal 2 (Frontend React App)**:
```bash
cd frontend
npm run dev     # Starts Vite on port 3000/3001
```
Open `http://localhost:3000` (or the port Vite provides) in your browser.

---

## 12. Production Considerations
Before deploying to production (e.g., Render, Heroku, AWS):
- **CORS Configuration**: Update `app.js` CORS settings to exclusively trust your specific frontend domain rather than acknowledging all origins.
- **Environment Targeting**: Set `NODE_ENV=production` on your server to silence stack traces in the `errorMiddleware`.
- **Token Storage**: For enterprise environments, consider migrating the JWT payload from `localStorage` to HttpOnly cookies to defend against XSS attacks.

---

## 13. Refactoring & Code Quality Improvements
This codebase recently underwent a massive architectural overhaul:
- **Express-Async-Handler**: Eliminated nested `try/catch` hell and unhandled promise rejections on the backend.
- **Service Layers**: Removed direct Axios calls from React components, allowing for isolated API testing.
- **Custom React Hooks**: Extracted all business logic out of God Components (like `Home.jsx`) into localized hooks (`useNotes`), strictly separating logic from views.
- **DRY Ownership Middleware**: Consolidated repetitive authorization verification on Note objects into a single explicit Express middleware.

## 14. Future Improvements
- Unit and Integration tests using **Jest** and **React Testing Library**.
- Implementation of React Query (`@tanstack/react-query`) for advanced cache invalidation and background fetching.
- Backend pagination and text-search indexing for scaling note storage.

## 15. License
MIT License. Free to use, modify, and distribute.
