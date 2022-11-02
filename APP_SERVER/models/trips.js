var mongoose = require('mongoose');

var tripSchema = mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minLength: 1
    },
    description: {
        type: String,
        default: 'N/A'
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    budget: {
        type: Number
    },
    image: {
        type: String
    },
    cover: {
        type: String
    },
    duration: {
        type: String,
        default: 'N/A'
    },
    facilities: {
        type: String,
        default: 'N/A'
    },
    services: {
        type: String,
        default: 'N/A'
    }
});

mongoose.model('Trip', tripSchema, 'trips');