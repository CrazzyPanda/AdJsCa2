import React, { Component } from 'react';
import axios from 'axios';
import {Table, Button, Container, Row, Col} from 'react-bootstrap/'
import { Link } from 'react-router-dom';


const Episode = props => (

    <tr>
        <th><Link to={`/episodes/${props.episode._id}`}>{props.episode.name}</Link></th>
        <td>{props.episode.season}</td>
        <td>{props.episode.episode}</td>
        <td>{props.episode.air_date}</td>
    </tr>
)


export default class EpisodeIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            episodes: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/episodes/')
        .then(response => {
            console.log(response);
            this.setState({
                episodes: response.data
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    episodeList() {
        return this.state.episodes.map(currentEpisode => {
            return <Episode episode={currentEpisode} key={currentEpisode._id} />;
        })
    }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log(loggedIn);
        return (
            <Container>
                <Row>
                    <Col>
                        <h3>Episode List</h3>
                    </Col>

                    <Col>
                        <Button as={Link} to="/episodes/create" variant="outline-info" style={{float: "right"}}>Add Episode</Button>
                    </Col>
                </Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Episode Name</th>
                            <th>Season</th>
                            <th>Episode</th>
                            <th>Airdate</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.episodeList() }
                    </tbody>
                </Table>
            </Container>
        );
    }
}
