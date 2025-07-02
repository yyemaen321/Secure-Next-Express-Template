// Auth controller
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const jwtSecretKey = process.env.JWT_SECRET || "your_jwt_secret";


export const register = async (req, res) => {
    try {
        const { email, firstName, lastName, role, gender } = req.body;

        if (!email || !firstName || !lastName || !role || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Database operations ....

        res.status(201).json({ 
            message: 'Account created. Please check your email to activate your account.'
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error creating account' });
    }
};



export const login = async (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password required'
        });
    }

    try {
        console.log('Attempting login for email:', email);



        // Database operations ....
        // fetch user from database using email
        const user = { 
            id: 1,
            email: email,
            role: { roleName: 'admin' },
            password: "$2b$12$Xo338/zPLnzTsN6VIRy0SuaH8pTbCSmUP9BD5540ISKgJfgpmp80O"  // "123" hashed password
        }


        // if user not found return 401 with message "Invalid email or password"
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

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

        
      
        res.status(200).json({
            message: 'Login successful',
            token,
            user
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: 'Login failed',
            error: error.message
        });
    }
};


