const mongoose = require('mongoose');

const lluviaSchema = new mongoose.Schema({
    valor: {
        type: Number,
        required: true,
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Lluvia', lluviaSchema);