const mongoose = require('mongoose');

// const SeasonSchema = new mongoose.Schema({
//     name: String
// });

// const EpisodeSchema = new mongoose.Schema(
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Episode'
//     }
// )

const CharacterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quote: {
        type: String,
        required: true
    },
    alter_name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    ethnicity: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    voiced: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    abilities: {
        type: String,
        required: true
    },
    episodes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Episode'
    }]
});

const Character = mongoose.model('Character', CharacterSchema, 'characters');
module.exports = Character;
