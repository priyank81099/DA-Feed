import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Icon } from "semantic-ui-react";

const Main = () => (
  <Container text>
    <Header
      as="h1"
      content="Share Inspire Innovate"
      style={{
        fontSize: "4em",
        fontWeight: "normal",
        color: "white",
        marginBottom: 0,
        marginTop: "6.5em",
        marginLeft: "1em"
      }}
    />

    <Link to="/front">
      <Button
        primary
        size="huge"
        style={{
          marginTop: "1.5em",
          marginBottom: "13em",
          marginLeft: "14em"
        }}
      >
        Get Started
        <Icon name="right arrow" />
      </Button>
    </Link>
  </Container>
);

export default Main;
