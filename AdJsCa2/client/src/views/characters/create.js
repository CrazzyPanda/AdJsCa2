import React, { Component } from 'react';
import axios from 'axios';
import {Container, Row, Col} from 'react-bootstrap/';
import {Form, Card, Button} from 'react-bootstrap/'

export default class CharacterCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
            abilities: '',
            episodes: [],
            selectedEpisodes: [],
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/episodes')
            .then(res => this.setState({
                episodes: res.data
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
        e.preventDefault();

        // axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
        // axios.post('http://localhost:4000/characters', character)
        //   .then(res => {
        //       console.log(res.data)
        //       this.props.history.push("/");
        //   })
        //   .catch(err => {
        //       console.log(err)
        //       this.props.history.push("/login");
        //   });

        const character = {
            name: this.state.name,
            quote: this.state.quote,
            alter_name: this.state.alter_name,
            gender: this.state.gender,
            age: this.state.age,
            nationality: this.state.nationality,
            ethnicity: this.state.ethnicity,
            skills: this.state.skills,
            voiced: this.state.voiced,
            overview: this.state.overview,
            description: this.state.description,
            abilities: this.state.abilities,
            episodes: this.state.selectedEpisodes
        }

        console.log(character);

        axios.post('http://localhost:4000/characters', character)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        window.location = '/characters/index';
    }

    // characterList() {
    //     return this.state.character.map((currentChaacter, index) => {
    //         return <Character character={currentCharacter} key={index} />
    //     })
    // }

//     <Card>
//   <Card.Header>Featured</Card.Header>
//   <Card.Body>
//     <Card.Title>Special title treatment</Card.Title>
//     <Card.Text>
//       With supporting text below as a natural lead-in to additional content.
//     </Card.Text>
//     <Button variant="primary">Go somewhere</Button>
//   </Card.Body>
// </Card>

    render() {
        let episodeOptions = this.state.episodes.map((episodes) => <option value={episodes._id} key={episodes._id}>{episodes.name}</option>);

        return (
            <Container>
                <div>
                    <h3>Add New Episode</h3>
                    <Form onSubmit={this.onSubmit}>
                        <Card>
                            <Card.Body>
                                <Form.Group>
                                    <Form.Label>Name of the Character: </Form.Label>
                                    <Form.Control type="text" placeholder="Enter their name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>A Quote that represents them: </Form.Label>
                                    <Form.Control type="text" placeholder="Enter their quote"
                                        name="quote"
                                        value={this.state.quote}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>What are their Alternative Names/Nicknames: </Form.Label>
                                    <Form.Control type="text" placeholder="e.g. Zuzu, Lee"
                                        name="alter_name"
                                        value={this.state.alter_name}
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
                                        value={this.state.gender}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Age: </Form.Label>
                                    <Form.Control type="text" placeholder="Enter their age"
                                        name="age"
                                        value={this.state.age}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Nationality: </Form.Label>
                                    <Form.Control type="text" placeholder="e.g. Southern Air Temple"
                                        name="nationality"
                                        value={this.state.nationality}
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
                                        value={this.state.ethnicity}
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
                                        value={this.state.skills}
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
                                        value={this.state.voiced}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Summary of the Character: </Form.Label>
                                    <Form.Control as="textarea" rows="2" placeholder="Write a summary..."
                                        name="overview"
                                        value={this.state.overview}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Description of the Character: </Form.Label>
                                    <Form.Control as="textarea" rows="4" placeholder="Write a description..."
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Description of their Abilities: </Form.Label>
                                    <Form.Control as="textarea" rows="4" placeholder="Write about their abilities..."
                                        name="abilities"
                                        value={this.state.abilities}
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
                                        <Button type="submit">Add Character</Button>
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
//
// <Form.Text className="text-muted">
//     Example: 101 = season 1 episode 1
// </Form.Text>
