const router = require('express').Router();
const passport = require('passport');
const settings = require('../config/passport')(passport);

let Episode = require('../models/Episode');

const getToken = (headers) => {
    if(headers && headers.autherization){
        let parted = headers.autherization.split(' ');
        if(parted.length === 2){
            return parted[1];
        }
        else{
            return null;
        }
    }
    else{
        return null;
    }
};


//Getting a list of episodes
router.route('/').get((req, res) => {
    Episode.find()
        .then(episodes => res.json(episodes))
        .catch(err => res.status(400).json('Error: ' + err)); //status 400 means bad request

    // res.json({message: "You are trying to get a list of episodes"});
    // res.json(data);
});

//Finding a specific episode
router.route("/:id").get((req, res) => {
    const episodeId = req.params.id;
    // res.json({message: "You are trying to get an episode"});

    Episode.findById(episodeId)
        .populate('characters', 'name')
        .then(result => {
            if(!result){
                return res.status(404).json({
                    message: "Episode not found with id " + episodeId
                });
            }
            res.json(result);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "Episode not found with id " + episodeId
                });
            }
            return res.status(500).json({
                message: "Error retrieveing episode with id " + episodeId
            });
        });


    // const episode = data.find(_episode => _episode.id == episodeId);
    //
    // if (episode) {
    //     // res.json(episode);
    // }
    // else {
    //     // res.json({message: `episode ${episodeId} does not exist`});
    // }

    // res.json(data);
});


//Creating new episode
router.route("/").post((req, res) => {
    const episode = req.body;

        if(!episode.name){
            return res.status(400).json({
                message: "Episode name can not be empty"
            });
        }

        const newEpisode = new Episode(episode);

        newEpisode.save()
            .then(data => {
                res.json(data);
            })
            .catch(err => res.status(400).json('Error: ' + err));
});

// router.route("/").post(passport.authenticate('jwt', {session: false}), (req, res) => {
//     const token = getToken(req,headers);
//     const episode = req.body;
//
//     if (token){
//         if(!episode.name){
//             return res.status(400).json({
//                 message: "Episode name can not be empty"
//             });
//         }
//
//         const newEpisode = new Episode(episode);
//
//         newEpisode.save()
//             .then(data => {
//                 res.json(data);
//             })
//             .catch(err => res.status(400).json('Error: ' + err));
//     }
//     else {
//         return res.status(403).json({success: false, message: 'Unauthorised'});
//     }
// });


// Episode.find({characters_id: characters._id}, function(err, episodes){
//     if(err)throw err;

// res.json({message: "You are trying to create a episode"});
// console.log('Adding new episode: ', episode);
//
// const newEpisode = new Episode(episode); //creating new episode and passing in whatever is in the request body
// newEpisode.save()//it saves the episode in the database
//         .then(() => {
//             res.json('Episode added');//once saved, it responds with this
//         })
//         .catch(err => res.status(400).json('Error: ' + err));//catchs any errors

//return updated listen
// res.json(data);



//Editing an episode
router.route("/:id").put((req, res) => {
    const episodeId = req.params.id;
    const newEpisode = req.body;

    Episode.findByIdAndUpdate(episodeId, newEpisode, {new: true})
    .then(episode => {
        if(!episode) {
            return res.status(404).json({
                message: "Episode not found with id " + episodeId
            });
        }
        res.json(episode);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).json({
                message: "Episode not found with id " + episodeId
            });
        }
        return res.status(500).json({
            message: "Error updating episode with id " + episodeId
        });
    });
});

// res.json({message: "You are trying to edit an episode"});
// console.log("Editing episode: ", episodeId, "to be ", episode);
//
// res.json(data);

// router.route("/:id").put(passport.authenticate('jwt', {session: false}), (req, res) => {
//     const token = getToken(req,headers);
//     const episodeId = req.params.id;
//     const newEpisode = req.body;
//
//     if (token){
//         Episode.findByIdAndUpdate(episodeId, newEpisode, {new: true})
//         .then(episode => {
//             if(!episode) {
//                 return res.status(404).json({
//                     message: "Episode not found with id " + episodeId
//                 });
//             }
//             res.json(episode);
//         }).catch(err => {
//             if(err.kind === 'ObjectId'){
//                 return res.status(404).json({
//                     message: "Episode not found with id " + episodeId
//                 });
//             }
//             return res.status(500).json({
//                 message: "Error updating episode with id " + episodeId
//             });
//         });
//     }
//     else {
//         return res.status(403).json({success: false, message: 'Unauthorised'});
//     }
// });




//Deleting an episode
router.route("/:id").delete((req, res) => {
    const episodeId = req.params.id;

    Episode.findByIdAndRemove(episodeId)
        .then(episode => {
            if(!episode){
                return res.status(404).json({
                    message:"Episode not found with id " + episodeId
                });
            }
            res.json({message: "Episode deleted successfully"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound'){
                return res.status(404).json({
                    message: "Episode not found with id " + episodeId
                });
            }
            return res.status(500).send({
                message: "Could not delete episode with id " + episodeId
            });
        });




    // res.json({message: "You are trying to delete a episode"});
    // console.log("Deleting episode: ", episodeId);

    // res.json(data);
});


module.exports = router;
