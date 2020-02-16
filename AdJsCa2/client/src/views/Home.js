import React, { Component } from 'react';
import SeasonSum from '../components/SeasonSum';
import {Container, Row, Col, Card} from 'react-bootstrap/'

export default class Home extends Component {

    render() {
        return(
            <Container>
                <Row>
                    <Col>
                        <h2>Avatar: The Last Airbender</h2>
                        <Card>
                            <Card.Body>
                                <p>
                                    Avatar: The Last Airbender, also known as Avatar: The Legend of Aang, is an Emmy award-winning American animated television series that aired for three seasons on Nickelodeon
                                    and the Nicktoons Network. The series was created and produced by Michael Dante DiMartino and Bryan Konietzko, who served as executive producers along with Aaron Ehasz.
                                    Avatar is set in an Asian-influenced world of martial arts and elemental manipulation. The show drew on elements from East Asian, South Asian, and Western culture, making
                                    it a mixture of what were previously traditionally separate categories of Japanese anime and Western domestic cartoons.<br/>
                                </p>
                                <hr/>
                                <h4>The Premise</h4>
                                <p>
                                    Avatar: The Last Airbender takes place in a fantasy world that is home to humans, fantastic animals, and spirits. Human civilization is divided into four nations: the Water
                                    Tribes, the Earth Kingdom, the Air Nomads, and the Fire Nation. Each nation has its own natural element, on which it bases its society, and within each nation exist people
                                    known as "benders" who have the innate power and ability to control and manipulate the eponymous element of their nation. The four types of bending arts are waterbending,
                                    earthbending, firebending, and airbending.
                                </p>
                                <p>
                                    Each generation yields one person who is capable of controlling and manipulating all four elements, the Avatar. When an Avatar dies, they are reincarnated into the next
                                    nation in the Avatar Cycle. The Avatar Cycle parallels the seasons: autumn for the Air Nomads, winter for the Water Tribe, spring for the Earth Kingdom and summer for the
                                    Fire Nation. Legend holds the Avatar must master each bending art in order, starting with his or her native element. This can sometimes be compromised when the situation
                                    requires it, as Aang demonstrates in the show.
                                </p>
                                <p>
                                    The Avatar possesses a unique power and ability called the Avatar State; a defense mechanism which endows the Avatar with all of the knowledge, powers and abilities of all of
                                    the past Avatars and acts as a self-triggering defense mechanism, although it can be made subject to the will if the user opens his bodily chakras. Through the ages, countless
                                    incarnations of the Avatar have served to keep the four nations in harmony and maintain world peace and order. The Avatar also serves as the bridge between the physical world
                                    and the Spirit World, allowing him or her to solve problems that normal benders cannot.
                                </p>
                                <hr/>
                                <SeasonSum/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}
