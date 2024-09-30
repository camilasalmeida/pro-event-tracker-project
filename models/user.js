const mongoose = require('mongoose');                      // Import mongoose package.


const userSchema = new mongoose.Schema({                   // Create the User Schema.
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);           // Register/create the model.

module.exports = User;                                     // Export the model.
