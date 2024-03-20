// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/login_form', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Create a mongoose schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

// Create a mongoose model
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.json());

// Handle signup POST request
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({
        email: email,
        password: password
    });
    newUser.save((err, user) => {
        if (err) {
            res.status(400).json({ message: 'Failed to sign up' });
        } else {
            res.status(200).json({ message: 'Signed up successfully' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
