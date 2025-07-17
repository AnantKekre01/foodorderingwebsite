const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3022;
const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log("MongoDB connection successful");
});

// User schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    pass: String
});

const Users = mongoose.model("User ", userSchema);

// Registration route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "registration.html"));
});

app.post('/post', async (req, res) => {
    const { name, email, pass } = req.body;

    // Check for missing fields
    if (!name) {
        return res.send("Name field is required. <a href='registration.html'>Go back</a>");
    }
    if (!email) {
        return res.send("Email field is required. <a href='registration.html'>Go back</a>");
    }
    if (!pass) {
        return res.send("Password field is required. <a href='registration.html'>Go back</a>");
    }

    // If all fields are provided, create a new user
    const user = new Users({
        name,
        email,
        pass
    });

    await user.save();
    console.log(user);
    res.redirect('/main'); // Redirect to main page after registration
});

// Login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "login.html")); // Serve the login HTML page
});

app.post('/login', async (req, res) => {
    const { email, pass } = req.body;

    // Check if user exists
    const user = await Users.findOne({ email, pass });
    
    if (user) {
        res.redirect('/main'); // Redirect to main page after successful login
    } else {
        res.status(401).send('Invalid email or password');
    }
});

// Main page route
app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, "main.html")); // Serve the main HTML page
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});