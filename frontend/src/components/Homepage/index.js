import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import { Container, Menu, Responsive } from "semantic-ui-react";
import Main from "./Main";
import './style.css';
import 'semantic-ui-css/semantic.min.css';

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const fixed = undefined;
const DesktopContainer = () => {
  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      <div className="Background">
        <Menu
          fixed={fixed ? 'top' : null}
          secondary={!fixed}
          size='large'
        >
        <Container>
          <Menu.Item position='right'>
            <Link to="/login">
              <button class="mainbutton" > Log In </button>
            </Link>
            <Link to="/signup">
              <button class="mainbutton" style={{ marginLeft: '0.5em'}} > Sign Up </button>
            </Link>
          </Menu.Item>
        </Container>
        </Menu>
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
      </div>
    </Responsive>
  );
};

export default DesktopContainer;
