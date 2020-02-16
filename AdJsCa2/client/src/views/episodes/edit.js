import React, { Component } from 'react';
import axios from 'axios';
import {Container, Row, Col} from 'react-bootstrap/';
import {Form, Card, Button} from 'react-bootstrap/'
import { Link } from 'react-router-dom';


const Season = props => (
  <option>{props.season}</option>
);

export default class EpisodeEdit extends Component {
    constructor(props) {
        super(props);

        let seasons = ["Book 1: Water", "Book 2: Earth", "Book 3: Fire"]

        this.state = {
            episodes: {
                name: '',
                season: seasons[0],
                episode: '',
                writer: '',
                director: '',
                animator: '',
                air_date: '',
                synopsis: ''
            },
            seasonList: seasons,
            characters: [],
            selectedCharacters: [],
        };
        console.log(this.state);
    }

    componentDidMount() {
        const {id} = this.props.match.params;

        axios.get(`http://localhost:4000/episodes/${id}`)
            .then((res) => {
                console.log({msg: + res});
                this.setState({
                    episodes: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`http://localhost:4000/characters`)
            .then(res => this.setState({
                characters: res.data
            }))
            .catch(err => console.log(err));
    }

    handleInputChange = e => {
        const target = e.target;
        const name = target.name;
        // const value =  target.type === 'checkbox' ? target.checked : target.value;
        var value =  target.type === 'checkbox' ? this.handleSelectChange(target.e) : target.value;

        console.log(`Input name ${name}. Input value ${value}.`);

        this.setState(state => {
            let episode = state.episodes;
            episode[name] = value;
            return {episode};
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
        const {id} = this.props.match.params;

        e.preventDefault();

        axios.put(`http://localhost:4000/episodes/${id}`, this.state.episodes)
            .then(res => {
                console.log(res);
                this.props.history.push('/episodes');
            })
            .catch(err => console.log(err));

        // window.location = '/episodes/index';
    }


    render() {

        let seasons = this.state.seasonList.map((currentSeason, index) => <Season season={currentSeason} key={index} />)
        let characterOptions = this.state.characters.map((characters) => <option value={characters._id} key={characters._id}>{characters.name}</option>);
        let { episodes } = this.state;

        return (
            <Container>
                <div>
                    <h3>Edit Episode</h3>
                    <Form onSubmit={this.onSubmit}>
                        <Card>
                            <Card.Body>
                                <Form.Group>
                                    <Form.Label>Name of the Episode: </Form.Label>
                                    <Form.Control type="text" placeholder="Enter the name"
                                        name="name"
                                        value={episodes.name}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Select the Season: </Form.Label>
                                    <Form.Control as="select"
                                        name="season"
                                        value={episodes.season}
                                        onChange={this.handleInputChange}
                                    >
                                    {seasons}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Enter the Episode: </Form.Label>
                                    <Form.Control type="text" placeholder="Enter the episode"
                                        name="episode"
                                        value={episodes.episode}
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
                                        value={episodes.writer}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Name of the Director: </Form.Label>
                                    <Form.Control type="text" placeholder="Enter the director"
                                        name="director"
                                        value={episodes.director}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Name of the Animators: </Form.Label>
                                    <Form.Control type="text" placeholder="Enter the animators"
                                        name="animator"
                                        value={episodes.animator}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Air Date of the Episode: </Form.Label>
                                    <Form.Control type="text" placeholder="Enter the air date"
                                        name="air_date"
                                        value={episodes.air_date}
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
                                        value={episodes.synopsis}
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
                                        <Button type="submit" variant="outline-info">Edit</Button>
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

//(`${process.env.REACT_APP_API_URI}/episodes/${id}`, this.state.episodes)
