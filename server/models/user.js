const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ProductDb', { useNewUrlParser: true, useUnifiedTopology: false });
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,

});

module.exports = mongoose.model('user', userSchema, 'users');