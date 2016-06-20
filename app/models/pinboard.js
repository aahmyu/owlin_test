var mongoose = require('mongoose');

var pinboardSchema = mongoose.Schema({
    user: String,
    time: Number,
    pins: [
        {
            title: String,
            kwic: String,
            url: String,
            pintime: Number
        }
    ]
});

module.exports = mongoose.model('Pinboards', pinboardSchema);