import jwt from 'jsonwebtoken';
const jwtSecretKey = process.env.JWT_SECRET || "your_jwt_secret";

// Token verification function
function verifyToken(token, secret) {

  if (!token) {
    throw new Error('No token provided');
  }

  if (!secret) {
    throw new Error('JWT secret is not defined');
  }

  try {
    // verify the token
    const decoded = jwt.verify(token, secret);
    return decoded;

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.log('Token expired:', error.message);
      throw new Error(error.name);
    } else if (error.name === 'JsonWebTokenError') {
      console.log('Invalid token:', error.message);
      throw new Error('Invalid token');
    }
    console.log('Token verification error:', error.message);
    throw new Error(error.message || 'Token verification failed');
  }
}

// Authentication middleware
export const authenticate = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  console.log(`\n--- AUTH DEBUG ---`);
  console.log(`Request: ${req.method} ${req.originalUrl}`);

  try {
    const decoded = verifyToken(token, jwtSecretKey);

    // get the user details from the database, exmple:

    //  const user = await prisma.user.findUnique({
    //    where: { id: decoded.id },
    //    include: {
    //      role: true,
    //      gender: true
    //    }
    //  });
    

    //  if (!user) {
    //    return res.status(401).json({ message: 'User not found' });
    //  }


    // optional: check if the token was created before the password was changed
    //  if (new Date(decoded.tokenCreatedAt) < user.passwordChangedAt) {
    //  'Password has been changed, please login again'
    //  return res.status(401).json({ message: 'TokenExpiredError' });
    //  }

    req.user = decoded 
    // optional: add the user details that you got from the database to the request object instead of the decoded token
    // req.user = user
    
    next();
  } catch (error) {
    //  'TokenExpiredError'
    return res.status(401).json({ message: error.message});
  }
};

// Authorization middleware
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      // if the user is not in the allowed roles, return a 403 error (forbidden)
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
}; 