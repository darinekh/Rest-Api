const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { UserSearchSchema } = require('./models/User');

dotenv.config();

const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/RestApi')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));



app.get('/', (req, res) => {
    res.send('Hello World!');
});

/*get all users */

app.get("/userss", async (req, res) => {
    try {
        const users = await UserSearchSchema.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//post add new users
app.post("/users", async (req, res) => {
    try {
        const user = new UserSearchSchema({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        });
        const savedUser = await user.save();
        res.status(201).json({ message: "User added successfully", user: savedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//put update users by id

app.put("/users/:id", async (req, res) => {
    try {
        const user = await UserSearchSchema.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                },
            },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//delete users by id

app.delete("/users/:id", async (req, res) => {
    try {
        const user = await UserSearchSchema.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.listen(port, () => {
    console.log(` app listening at http://localhost:${port}`);
    console.log('Connected to MongoDB');
});