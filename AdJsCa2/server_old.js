const express = require('express');
const body_parser = require('body-parser');
const app = express();

let data = require('./movies.json');

app.use(body_parser.json());

// app.get("/json", (req, res) => {
//     res.json({ message: "Hello World" });
// });
//
// app.get("/", (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

//Getting all the movies
app.get("/movies", (req, res) => {
    res.json(data);
});

//Finding a specific movie
app.get("/movies/:id", (req, res) => {
    const movieId = req.params.id;
    const movie = data.find(_movie => _movie.id == movieId);

    if (movie) {
        res.json(movie);
    }
    else {
        res.json({message: `movie ${movieId} does not exist`});
    }

    res.json(data);
});

//Creating new movie
app.post("/movies", (req, res) => {
    const movie = req.body;
    console.log('Adding new movie: ', movie);
    data.push(movie);

    //return updated listen
    res.json(data);
});

//Editing a movie
app.put("/movies/:id", (req, res) => {
    const movieId = res.params.id;
    const movie = req.body;
    console.log("Editing movie: ", movieId, "to be ", movie);

    const updatedList = [];

    data.forEach((oldMovie, index) => {
        if (oldMovie.id === movieId) {
            data[index] = movie;
        }
    });
    res.json(data);
});

//Deleting a movie
app.delete("/movies/:id", (req, res) => {
    const movieId = res.params.id;

    console.log("Deleting movie: ", movieId);

    const filtered_list = data.filter(movie => movie.id !== movieId);
    data = filtered_list;

    res.json(data);
});


const port = 4000;

app.listen(port, () => {
    console.log(`Server listening ${port}`);
});
