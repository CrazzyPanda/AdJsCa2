import React, { Component } from 'react';
import axios from 'axios';
import {Container, Row, Col} from 'react-bootstrap/';
import {Form, Card, Button} from 'react-bootstrap/'
import { Link } from 'react-router-dom';


export default class CharacterEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            characters: {
                name: '',
                quote: '',
                alter_name: '',
                gender: '',
                age: '',
                nationality: '',
                ethnicity: '',
                skills: '',
                voiced: '',
                overview: '',
                description: '',
                abilities: ''
            },
            episodes: [],
            selectedEpisodes: [],
        };
        console.log(this.state);
    }

    componentDidMount() {
        const {id} = this.props.match.params;

        axios.get(`http://localhost:4000/characters/${id}`)
            .then((res) => {
                console.log({msg: + res});
                this.setState({
                    characters: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`http://localhost:4000/episodes`)
            .then(res => this.setState({
                episodes: res.data
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
            let character = state.characters;
            character[name] = value;
            return {character};
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
            selectedEpisodes: value
        }, () => console.log(this.state));
    }

    onSubmit = e => {
        const {id} = this.props.match.params;

        e.preventDefault();

        axios.put(`http://localhost:4000/characters/${id}`, this.state.characters)
            .then(res => {
                console.log(res);
                this.props.history.push('/characters');
            })
            .catch(err => console.log(err));

        window.location = '/characters/index';
    }


    render() {

        let episodeOptions = this.state.episodes.map((episodes) => <option value={episodes._id} key={episodes._id}>{episodes.name}</option>);
        let { characters } = this.state;

        return (
            <Container>
                <div>
                    <h3>Edit Character</h3>
                    <Form onSubmit={this.onSubmit}>
                    <Card>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Name of the Character: </Form.Label>
                                <Form.Control type="text" placeholder="Enter their name"
                                    name="name"
                                    value={characters.name}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>A Quote that represents them: </Form.Label>
                                <Form.Control type="text" placeholder="Enter their quote"
                                    name="quote"
                                    value={characters.quote}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>What are their Alternative Names/Nicknames: </Form.Label>
                                <Form.Control type="text" placeholder="e.g. Zuzu, Lee"
                                    name="alter_name"
                                    value={characters.alter_name}
                                    onChange={this.handleInputChange}
                                />
                                <Form.Text className="text-muted">
                                    Note: Zuko was nicknamed 'Zuzu' by his sister and when he was on the run, he went by 'Lee'
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Gender: </Form.Label>
                                <Form.Control type="text" placeholder="Enter their gender"
                                    name="gender"
                                    value={characters.gender}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Age: </Form.Label>
                                <Form.Control type="text" placeholder="Enter their age"
                                    name="age"
                                    value={characters.age}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nationality: </Form.Label>
                                <Form.Control type="text" placeholder="e.g. Southern Air Temple"
                                    name="nationality"
                                    value={characters.nationality}
                                    onChange={this.handleInputChange}
                                />
                                <Form.Text className="text-muted">
                                    Note: Where the character is specifically from
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Ethnicity: </Form.Label>
                                <Form.Control type="text" placeholder="e.g. Air Nomad"
                                    name="ethnicity"
                                    value={characters.ethnicity}
                                    onChange={this.handleInputChange}
                                />
                                <Form.Text className="text-muted">
                                    Note: What nation the character is from
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Character Skills: </Form.Label>
                                <Form.Control type="text" placeholder="List their skills"
                                    name="skills"
                                    value={characters.skills}
                                    onChange={this.handleInputChange}
                                />
                                <Form.Text className="text-muted">
                                    Example: Firebending, Sword Fighting etc.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Voiced by who: </Form.Label>
                                <Form.Control type="text" placeholder="Voiced by"
                                    name="voiced"
                                    value={characters.voiced}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Summary of the Character: </Form.Label>
                                <Form.Control as="textarea" rows="2" placeholder="Write a summary..."
                                    name="overview"
                                    value={characters.overview}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description of the Character: </Form.Label>
                                <Form.Control as="textarea" rows="4" placeholder="Write a description..."
                                    name="description"
                                    value={characters.description}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description of their Abilities: </Form.Label>
                                <Form.Control as="textarea" rows="4" placeholder="Write about their abilities..."
                                    name="abilities"
                                    value={characters.abilities}
                                    onChange={this.handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Select the Episodes this character is in: </Form.Label>
                                <Form.Control as="select" multiple
                                name="episodes"
                                onChange={this.handleSelectChange}
                                >
                                {episodeOptions}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col>
                                    <Button type="submit">Edit</Button>
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
