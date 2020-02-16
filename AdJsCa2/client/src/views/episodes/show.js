import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap/'
import {Button, Table, Card, Badge, Carousel} from 'react-bootstrap/'

// const Genre = props => (
//   <Badge variant="light">{props.genre}</Badge>
// )

export default class EpisodeShow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            episode: {},
            loading: true
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        axios.get(`http://localhost:4000/episodes/${id}`)
        .then(response => {
            console.log(response);
            this.setState({
                episode: response.data,
                loading: false
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    onDelete = e => {
        const id = e.target.value;

        axios.delete(`http://localhost:4000/episodes/${id}`)
            .then((res) => {
                this.props.history.push('/episodes');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const { episode, loading } = this.state;

        if (loading) {
            return (
                <div>
                    <h3>Loading...</h3>
                </div>
            )
        }

        const loggedIn = this.props.loggedIn;
        return (
            <>
                <Container>
                    <Row>
                        <Col>
                            <h2>{episode.name}</h2>
                        </Col>
                        <Col>
                            <Button value={this.props.match.params.id} onClick={ this.onDelete} variant="outline-danger" style={{float: "right"}}>Delete</Button>
                            <Button as={Link} to={`/episodes/${episode._id}/edit`} variant="outline-info" style={{float: "right"}}>Edit</Button>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            <p>{episode.synopsis}</p>
                        </Col>
                        <Col sm="4">
                            <Table striped bordered size="sm">
                                <tbody>
                                    <tr>
                                        <td>Season</td>
                                        <td>{episode.season}</td>
                                    </tr>
                                    <tr>
                                        <td>Episode</td>
                                        <td>{episode.episode}</td>
                                    </tr>
                                    <tr>
                                        <td>Writers</td>
                                        <td>{episode.writer}</td>
                                    </tr>
                                    <tr>
                                        <td>Director</td>
                                        <td>{episode.director}</td>
                                    </tr>
                                    <tr>
                                        <td>Animators</td>
                                        <td>{episode.animator}</td>
                                    </tr>
                                    <tr>
                                        <td>Original Air Date</td>
                                        <td>{episode.air_date}</td>
                                    </tr>
                                    <tr>
                                        <td>Main Characters</td>
                                        <td>{episode.characters.name}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="/AangIceberg.png"
                                        alt="First slide"
                                        height="300"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="/AvatarAangBack.png"
                                        alt="Second slide"
                                        height="300"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="/SukiandSokka.png"
                                        alt="Second slide"
                                        height="300"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="/ZukoKataranecklace.png"
                                        alt="Second slide"
                                        height="300"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="/AangmeetsRoku.png"
                                        alt="Second slide"
                                        height="300"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="/KataravsMasterPakku.png"
                                        alt="Second slide"
                                        height="300"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="/AangandKoh.png"
                                        alt="Second slide"
                                        height="300"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="/ZukoIrohattack.png"
                                        alt="Second slide"
                                        height="300"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="/SokkaHakoda.png"
                                        alt="Second slide"
                                        height="300"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="/ZhaoIroh.png"
                                        alt="Second slide"
                                        height="300"
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}
