const router = require('express').Router();
const passport = require('passport');
const settings = require('../config/passport')(passport);

let Character = require('../models/Character');

// const getToken = (headers) => {
//     if(headers && headers.autherization){
//         let parted = headers.autherization.split(' ');
//         if(parted.length === 2){
//             return parted[1];
//         }
//         else{
//             return null;
//         }
//     }
//     else{
//         return null;
//     }
// };




//Getting a list of characters
router.route('/').get((req, res) => {
    Character.find()
        .then(characters => res.json(characters))
        .catch(err => res.status(400).json('Error: ' + err)); //status 400 means bad request

    // res.json({message: "You are trying to get a list of characters"});
    // res.json(data);
});

//Finding a specific character
router.route("/:id").get((req, res) => {
    const characterId = req.params.id;
    // res.json({message: "You are trying to get a character"});

    Character.findById(characterId)
        .then(result => {
            if(!result){
                return res.status(404).json({
                    message: "Character not found with id " + characterId
                });
            }
            res.json(result);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "Character not found with id " + characterId
                });
            }
            return res.status(500).json({
                message: "Error retrieveing character with id " + characterId
            });
        });



    // const character = data.find(_character => _character.id == characterId);
    //
    // if (character) {
    //     res.json(character);
    // }
    // else {
    //     res.json({message: `character ${characterId} does not exist`});
    // }
    //
    // res.json(data);
});

//Creating new character
router.route("/").post((req, res) => {
    const character = req.body;

    if(!character.name){
        return res.status(400).json({
            message: "Character name can not be empty"
        });
    }

    const newCharacter = new Character(character);

    newCharacter.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Error: ' + err));

//
//     // res.json({message: "You are trying to create a character"});
//     // console.log('Adding new character: ', character);
//     //
//     // const newCharacter = new Character(character); //creating new character and passing in whatever is in the request body
//     // newCharacter.save()//it saves the character in the database
//     //         .then(() => {
//     //             res.json('Character added');//once saved, it responds with this
//     //         })
//     //         .catch(err => res.status(400).json('Error: ' + err));//catchs any errors
//
//     //return updated listen
//     // res.json(data);
});


////////////////Create with token //////////////////////////////
// router.route("/").post(passport.authenticate('jwt', {session: false}), (req, res) => {
//     const token = getToken(req,headers);
//     const character = req.body;
//
//     if (token){
//         if(!character.name){
//             return res.status(400).json({
//                 message: "Character name can not be empty"
//             });
//         }
//
//         const newCharacter = new Character(character);
//
//         newCharacter.save()
//             .then(data => {
//                 res.json(data);
//             })
//             .catch(err => res.status(400).json('Error: ' + err));
//     }
//     else {
//         return res.status(403).json({success: false, message: 'Unauthorised'});
//     }
// });












//Editing a character
router.route("/:id").put((req, res) => {
    const characterId = req.params.id;
    const newCharacter = req.body;

    Character.findByIdAndUpdate(characterId, newCharacter, {new: true})
    .then(character => {
        if(!character) {
            return res.status(404).json({
                message: "Character not found with id " + characterId
            });
        }
        res.json(character);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).json({
                message: "Character not found with id " + characterId
            });
        }
        return res.status(500).json({
            message: "Error updating character with id " + characterId
        });
    });


    // const characterId = res.params.id;
    // const character = req.body;
    // res.json({message: "You are trying to edit an character"});
    // console.log("Editing character: ", characterId, "to be ", character);

    // res.json(data);
});

//Deleting a character
router.route("/:id").delete((req, res) => {
    const characterId = req.params.id;

    Character.findByIdAndRemove(characterId)
        .then(character => {
            if(!character){
                return res.status(404).json({
                    message:"Character not found with id " + characterId
                });
            }
            res.json({message: "Character deleted successfully"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound'){
                return res.status(404).json({
                    message: "Character not found with id " + characterId
                });
            }
            return res.status(500).send({
                message: "Could not delete character with id " + characterId
            });
        });





    // const characterId = res.params.id;
    // res.json({message: "You are trying to delete a character"});
    // console.log("Deleting character: ", characterId);

    // res.json(data);
});


module.exports = router;
