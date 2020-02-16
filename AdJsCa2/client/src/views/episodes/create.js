import React, { Component } from 'react';
import axios from 'axios';
import {Container, Row, Col} from 'react-bootstrap/';
import {Form, Card, Button} from 'react-bootstrap/'
import { Link } from 'react-router-dom';


const Season = props => (
  <option>{props.season}</option>
);

export default class EpisodeCreate extends Component {
    constructor(props) {
        super(props);

        let seasons = ["Book 1: Water", "Book 2: Earth", "Book 3: Fire"]

        this.state = {
            name: '',
            season: seasons[0],
            episode: '',
            writer: '',
            director: '',
            animator: '',
            air_date: '',
            synopsis: '',
            seasonList: seasons,
            characters: [],
            selectedCharacters: [],
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/characters')
            .then(res => this.setState({
                characters: res.data
            }))
            .catch(err => console.log(err));
    }

    handleInputChange = e => {
        const target = e.target;
        const value =  target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        console.log(`Input name ${name}. Input value ${value}.`);

        this.setState({
            [name]: value
        });
    }


    handleSelectChange = e => {
        let options = e.target.options;
        let value = [];
        let name = e.target.name;

        console.log(value);

        // let selected = options.filter(o => o.selected);

        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }

        console.log(value);

        this.setState({
            selectedCharacters: value
        }, () => console.log(this.state));
    }

    onSubmit = e => {
        e.preventDefault();

        const episode = {
            name: this.state.name,
            season: this.state.season,
            episode: this.state.episode,
            writer: this.state.writer,
            director: this.state.director,
            animator: this.state.animator,
            air_date: this.state.air_date,
            synopsis: this.state.synopsis,
            characters: this.state.selectedCharacters
        }
        console.log(episode);

        axios.post('http://localhost:4000/episodes', episode)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        window.location = '/episodes/index';

        // axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
        // axios.post('http://localhost:4000/episodes', episode)
        //     .then(res => {
        //         console.log(res.data)
        //         this.props.history.push("/episodes/index");
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         this.props.history.push("/login");
        //     });
    }


    render() {

        let seasons = this.state.seasonList.map((currentSeason, index) => <Season season={currentSeason} key={index} />)
        let characterOptions = this.state.characters.map((characters) => <option value={characters._id} key={characters._id}>{characters.name}</option>);

        return (
            <Container>
                <div>
                    <h3>Add New Episode</h3>
                    <Form onSubmit={this.onSubmit}>
                        <Card>
                            <Card.Body>
                                <Form.Group>
                                    <Form.Label>Name of the Episode: </Form.Label>
                                    <Form.Control type="text" placeholder="Enter the name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Select the Season: </Form.Label>
                                    <Form.Control as="select"
                                    name="season"
                                    value={this.state.season}
                                    onChange={this.handleInputChange}
                                    >
                                    {seasons}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Enter the Episode: </Form.Label>
                                    <Form.Control type="text" placeholder="Enter the episode"
                                        name="episode"
                                        value={this.state.episode}
                                        onChange={this.handleInputChange}
                                    />
                                    <Form.Text className="text-muted">
                                        Example: 101 = season 1 episode 1
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Name of the Writers: </Form.Label>
                                    <Form.Control type="text" placeholder="Enter the writers"
                                        name="writer"
                                        value={this.state.writer}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Name of the Director: </Form.Label>
                                    <Form.Control type="text" placeholder="Enter the director"
                                        name="director"
                                        value={this.state.director}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Name of the Animators: </Form.Label>
                                    <Form.Control type="text" placeholder="Enter the animators"
                                        name="animator"
                                        value={this.state.animator}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Air Date of the Episode: </Form.Label>
                                    <Form.Control type="text" placeholder="Enter the air date"
                                        name="air_date"
                                        value={this.state.air_date}
                                        onChange={this.handleInputChange}
                                    />
                                    <Form.Text className="text-muted">
                                        Example: 10 February 2005
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Synopsis of the Episode: </Form.Label>
                                    <Form.Control as="textarea" rows="4" placeholder="Write a synopsis..."
                                        name="synopsis"
                                        value={this.state.synopsis}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Select the Main Characters in the Episode: </Form.Label>
                                    <Form.Control as="select" multiple
                                    name="characters"
                                    // value={this.state.characters}
                                    onChange={this.handleSelectChange}
                                    >
                                    {characterOptions}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Col sm="1">
                                        <Button type="submit" variant="outline-info">Add</Button>
                                    </Col>
                                    <Col>
                                        <Button as={Link} to="/episodes/index" variant="outline-secondary">Cancel</Button>
                                    </Col>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Form>
                </div>
            </Container>
        );
    }
}
