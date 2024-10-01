const mongoose = require('mongoose');                      // Import mongoose package.
//-----------------------------------------------\\

const eventSchema = new mongoose.Schema({ 
    company: {
        type: String,
        required: true,
    },
    conferenceTitle: {
        type: String,
        required: true,
    },
    field: {
        type: String,
    },
    date: {
        type: Date,
    },
    principalSpeakers: {
        type: [String],
    },
    postingLink: {
        type: 
            String,
    },
    status: {
        type: String,
            enum: ['attended', 'booked', 'interested', 'cancelled'],
        }
});


const userSchema = new mongoose.Schema({                   // Create the User Schema.
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    events: [eventSchema],
});

const User = mongoose.model('User', userSchema);           // Register/create the model.

module.exports = User;                                     // Export the model.
