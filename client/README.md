# Next.js Client

This is the frontend part of the template repository, built with Next.js, React, TypeScript, and Tailwind CSS.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following content:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. Run the development server:
```bash
npm run dev
```

## Project Structure

- `src/`: Source files
  - `app/`: Next.js App Router
  - `components/`: React components
  - `services/`: API services for backend communication

## API Integration Example

The template includes a complete example of API integration with the backend:

### Authentication Service

Located in `src/services/api.js`:

```javascript
// Authentication service for user login and registration
export const authService = {
  // Login function - sends credentials to API and stores the JWT token
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return response.data;
  },
  
  // Registration function
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }
};
```

### Login Form Example

The homepage (`src/app/page.tsx`) includes a functional login form that demonstrates:

1. Form state management with React hooks
2. API calls using the authentication service
3. Error handling and success messages
4. Token storage in localStorage

### Axios Interceptors

The API service automatically adds authentication tokens to requests:

```javascript
// Request interceptor for adding auth token to all API requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios for API requests

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
