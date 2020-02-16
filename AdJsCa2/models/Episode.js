const mongoose = require('mongoose');

// const SeasonSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         enum: ["Book 1: Water", "Book 2: Earth", "Book 3: Fire"]
//     }
// });

// const CharacterSchema = new mongoose.Schema(
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Character'
//     }
// )

const EpisodeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    season: {
        type: String,
        enum: ["Book 1: Water", "Book 2: Earth", "Book 3: Fire"],
        required: true
    },
    // season: {
    //     type: String,
    //     required: true
    // },
    episode: {
        type: String,
        required: true
    },
    writer: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    animator: {
        type: String,
        required: true
    },
    air_date: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    characters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character'
    }]
});

const Episode = mongoose.model('Episode', EpisodeSchema);
module.exports = Episode;
