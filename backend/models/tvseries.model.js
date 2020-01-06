const mongoose = require('mongoose');

const Schema = mongoose.Schema

const tvseriesSchema = new Schema({
    username: {type: String, required: true}, 
    title: {type: String, required: true},
    description: {type: String, required: true}, 
    stars: {type: Number, required: true}, 
    date: {type: Date, required: true}
}, {
    timestamps: true
})

const TVSeries = mongoose.model('TVSeries', tvseriesSchema)

module.exports = TVSeries