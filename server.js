const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

// In-memory user database
let users = [];

// 1. Signup Route
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' });
    }

    const userExists = users.find(u => u.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    users.push({ username, password });
    res.status(201).json({ message: 'User registered successfully!' });
});

// 2. Login Route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ message: 'Login successful!', token: 'fake-jwt-token-12345' });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

app.listen(PORT, () => {
    console.log(`Auth Server running on http://localhost:${PORT}`);
});