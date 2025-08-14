const express = require('express'); // third party module
const cors = require('cors');
const jwt = require('jsonwebtoken'); // creating and verify Token

const app = express();
app.use(cors());
app.use(express.json()); // loads a middleware

const users = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'user', password: 'user123', role: 'user' }
];

const JWT_SECRET = 'your-secret-key'; // use to sign and verify token

const generateToken = (userId, role) => {
    return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '1h' });
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.header['authorization']; // extract the Authorization header from request
    const token = authHeader && authHeader.split(" ")[1]; // 'Bearer Token'
    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    })
}

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(403).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user.id, user.role);
    res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, username: user.username, roles: user.role }
    })
})

app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({
        message: 'This is Protected route',
        user: req.user
    })
})

app.get('/api/admin', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin acess required' });
    }

    res.json({
        message: 'Admin Dashboard',
        user: req.user
    })
})

app.get('/api/verify', authenticateToken, (req, res) => {
    res.json({
        message: 'Token is valid',
        user: req.user
    })
})

const port = process.env.PORT || 3000;

app.listen(port, () => { // Bind and listen for connections
    console.log(`App is running at http://localhost:${port}`);
})
