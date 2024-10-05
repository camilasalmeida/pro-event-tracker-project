const mongoose = require('mongoose');                      

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
        enum: [
            'Technology',
            'Marketing',
            'Health & Wellness',
            'Finance',
            'Education',
            'Arts & Culture',
            'Business Development',
            'Networking',
            'Startups & Entrepreneurship',
            'Sustainability',
            'Other',
    ], 
    required: true,
    },
    date: {
        type: Date,
    },
    location: {
        type: String,
    },
    principalSpeakers: {
        type: [String],
    },
    eventLink: {
        type: String,
    },
    status: {
        type: String,
        enum: ['interested', 'booked', 'attended', 'cancelled'],
        },
    personalNotes: {
        type: String,
    },
});

const userSchema = new mongoose.Schema({                   
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

const User = mongoose.model('User', userSchema);           

module.exports = User;                                    
