import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap/'
import {Button, Table, Card, Badge, Carousel} from 'react-bootstrap/'

export default class CharacterShow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            character: {},
            loading: true
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        axios.get(`http://localhost:4000/characters/${id}`)
        .then(response => {
            console.log(response);
            this.setState({
                character: response.data,
                loading: false
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    onDelete = e => {
        const id = e.target.value;

        axios.delete(`http://localhost:4000/characters/${id}`)
            .then((res) => {
                this.props.history.push('/characters');
            })
            .catch((err) => {
                console.log(err);
            });
        window.location = '/characters/index';
    }

    render() {
        const { character, loading } = this.state;

        if (loading) {
            return (
                <div>
                    <h3>Loading...</h3>
                </div>
            )
        }

        return (
            <>
                <Container>
                    <Row>
                        <Col>
                            <h2>{character.name}</h2>
                        </Col>
                        <Col>
                            <Button value={this.props.match.params.id} onClick={ this.onDelete} variant="outline-danger" style={{float: "right"}}>Delete</Button>
                            <Button as={Link} to={`/characters/${character._id}/edit`} variant="outline-info" style={{float: "right"}}>Edit</Button>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            <p>"{character.quote}"</p>
                            <p>{character.description}</p>
                            <h5>Character's Abilities</h5>
                            <p>{character.abilities}</p>
                        </Col>
                        <Col sm="4">
                            <Table striped bordered size="sm">
                                <tbody>
                                    <tr>
                                        <td>Age</td>
                                        <td>{character.age}</td>
                                    </tr>
                                    <tr>
                                        <td>Gender</td>
                                        <td>{character.gender}</td>
                                    </tr>
                                    <tr>
                                        <td>Alternative Names</td>
                                        <td>{character.alter_name}</td>
                                    </tr>
                                    <tr>
                                        <td>Ethnicity</td>
                                        <td>{character.ethnicity}</td>
                                    </tr>
                                    <tr>
                                        <td>Nationality</td>
                                        <td>{character.nationality}</td>
                                    </tr>
                                    <tr>
                                        <td>Skills</td>
                                        <td>{character.skills}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="/Aang.png"
                                        alt="First slide"
                                        height="300"
                                    />
                                    <Carousel.Caption>
                                        <h2>Aang</h2>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="/Katara.png"
                                        alt="Second slide"
                                        height="300"
                                    />
                                    <Carousel.Caption>
                                        <h2>Katara</h2>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="/Sokka.png"
                                        alt="Second slide"
                                        height="300"
                                    />
                                    <Carousel.Caption>
                                        <h2>Sokka</h2>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="/Toph.png"
                                        alt="Second slide"
                                        height="300"
                                    />
                                    <Carousel.Caption>
                                        <h2>Toph</h2>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="/Zuko.png"
                                        alt="Second slide"
                                        height="300"
                                    />
                                    <Carousel.Caption>
                                        <h2>Zuko</h2>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="/Iroh.png"
                                        alt="Second slide"
                                        height="300"
                                    />
                                    <Carousel.Caption>
                                        <h2>Iroh</h2>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="/Suki.png"
                                        alt="Second slide"
                                        height="300"
                                    />
                                    <Carousel.Caption>
                                        <h2>Suki</h2>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}
