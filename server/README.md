# Express Server

This is the backend part of the template repository, built with Express.js.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following content:
```
PORT=5000
JWT_SECRET=your_secure_jwt_secret_key
```

3. Run the development server:
```bash
npm run dev
```

4. Access API documentation:
```
http://localhost:5000/api-docs
```

## Authentication API Example

This template includes a complete authentication API implementation:

### Authentication Routes

Located in `routes/authRoutes.js`:

```javascript
import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
export default router;
```

### Authentication Controller

Located in `controllers/authController.js`:

```javascript
// Login endpoint handling
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password required'
        });
    }

    try {
        // Authenticate user (simplified for example)
        const user = { 
            id: 1,
            email: email,
            role: { roleName: 'admin' },
            password: "$2b$12$Xo338/zPLnzTsN6VIRy0SuaH8pTbCSmUP9BD5540ISKgJfgpmp80O"
        }

        // Verify password with bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role.roleName,
                tokenCreatedAt: new Date()
            },
            jwtSecretKey,
            { expiresIn: '1h' }
        );
      
        // Return token and user info
        res.status(200).json({
            message: 'Login successful',
            token,
            user
        });
    } catch (error) {
        res.status(500).json({
            message: 'Login failed',
            error: error.message
        });
    }
};
```

### API Usage Example

To use the authentication API:

1. **Register a new user**:
   ```
   POST /api/auth/register
   Content-Type: application/json
   
   {
     "email": "user@example.com",
     "firstName": "John",
     "lastName": "Doe",
     "role": "user",
     "gender": "male"
   }
   ```

2. **Login**:
   ```
   POST /api/auth/login
   Content-Type: application/json
   
   {
     "email": "user@example.com",
     "password": "yourpassword"
   }
   ```
   
   Response:
   ```json
   {
     "message": "Login successful",
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "user": {
       "id": 1,
       "email": "user@example.com",
       "role": { "roleName": "admin" }
     }
   }
   ```

3. **Using the token for authenticated requests**:
   ```
   GET /api/users
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Most endpoints require authentication.

- To authenticate, send a POST request to `/api/auth/login` with email and password
- Add the returned token to subsequent requests as a Bearer token in the Authorization header:
  ```
  Authorization: Bearer your_token_here
  ```
- Token expiration is set to 1 day by default

## Adding a Database

This template is database-agnostic, allowing you to choose any database you prefer:

### SQL Databases
- PostgreSQL: `npm install pg pg-hstore sequelize`
- MySQL: `npm install mysql2 sequelize`

### NoSQL Databases
- MongoDB: `npm install mongoose`
- Firebase: `npm install firebase-admin`

### ORM Options
- Prisma: `npm install prisma @prisma/client` 
  ```bash
  npx prisma init
  ```
  Supports PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and more.

## Project Structure

- `controllers/`: Request handlers
- `routes/`: API route definitions
- `middleware/`: Custom middleware (authentication, etc.)
- `utils/`: Utility functions
- `server.js`: Server entry point
- `swagger.json`: API documentation configuration

## Technologies Used

- Express.js
- Node.js
- JWT for authentication
- Swagger UI for API documentation
- Nodemon for development 