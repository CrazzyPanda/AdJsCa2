import React, { Component } from 'react';
import axios from 'axios';
import {Button, Card, Col, Row, Container} from 'react-bootstrap/'
import { Link } from 'react-router-dom';

const Character = props => (
    <Card.Body>
        <Card.Title><Link to={`/characters/${props.character._id}`}>{props.character.name}</Link></Card.Title>
        <Card.Text>{props.character.overview}</Card.Text>
    </Card.Body>
)

export default class CharacterIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            characters: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/characters/')
        .then(response => {
            console.log(response);
            this.setState({
                characters: response.data
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    characterList() {
        return this.state.characters.map(currentCharacter => {
            return <Character character={currentCharacter} key={currentCharacter._id} />;
        })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h3>Character List</h3>
                    </Col>
                    <Col>
                        <Button as={Link} as={Link} to="/characters/create" variant="outline-info" style={{float: "right"}}>Add Character</Button>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        { this.characterList() }
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}
// <h3>Character List</h3>
// <Button as={Link} as={Link} to="/characters/create" variant="primary">Create Character</Button>
// <Card>
//     <Card.Body>
//         { this.characterList() }
//     </Card.Body>
// </Card>

// <h3>Character List</h3>
// <Button as={Link} as={Link} to="/characters/create" variant="primary">Create Character</Button>
// <Table striped bordered hover>
//   <thead>
//     <tr>
//       <th>Name</th>
//       <th>Overview</th>
//     </tr>
//   </thead>
//   <tbody>
//     { this.characterList() }
//   </tbody>
// </Table>
