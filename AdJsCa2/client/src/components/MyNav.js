import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap/'


class MyNav extends Component{

    logout = () => {
        localStorage.removeItem('jwtToken');
        this.props.onLogout();
    }

    render(){
        const loggedIn = this.props.loggedIn;
        return (
            <>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="#home">Avatar</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/episodes/index">Episodes</Nav.Link>
                            <Nav.Link as={Link} to="/characters/index">Characters</Nav.Link>
                        </Nav>
                        <Nav >
                            {(loggedIn) ? (
                                <Nav.Link onClick={this.logout}>Logout</Nav.Link>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar>
            </>
        );
    }

}

export default MyNav;
