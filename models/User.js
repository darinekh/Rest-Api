//Schema user : id , firstName , LastName , email , password 

const mongoose = require('mongoose');

const UserSearchSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = { UserSearchSchema: mongoose.model('User', UserSearchSchema) };