import React from "react";
import Navigation from "./Navigation";
import InfoUser from "./InfoUser";
import { Container } from "react-bootstrap";
import Orders from "./Orders";


class Home extends React.Component {
    render() {
        return (
            <Container>
                <Navigation />
                <InfoUser />
                <Container>
                    <Orders/>
                </Container>

            </Container>
        )
    }
}

export default Home;