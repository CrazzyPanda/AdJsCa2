import React, { Component } from 'react';
import axios from 'axios';
import {Container, Row, Col} from 'react-bootstrap/'
import {Button, Card, Form} from 'react-bootstrap/'
import { Link } from 'react-router-dom';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    handleInputChange = e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        console.log(`Input name ${name}. Input value ${value}.`);

        this.setState({
            [name]: value
        });
    };

    onSubmit = e => {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        console.log(user);

        axios.post('http://localhost:4000/account/register', user)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        window.location = '/login';
    };

    render() {

        return (
            <>
                <Container>
                    <Card>
                        <Card.Body>
                            <Card.Title><h3>Register</h3></Card.Title>
                            <hr/>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Col sm="1">
                                        <Button type="submit" variant="outline-info">Register</Button>
                                    </Col>
                                    <Col>
                                        <Button as={Link} to="/" variant="outline-secondary">Cancel</Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </>
        )
    }
}
