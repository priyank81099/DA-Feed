import React, { Component } from "react";
import { Menu, Grid } from "semantic-ui-react";
import { Link} from "react-router-dom";
import './front.css'

export default class Sidebar extends Component {
  state = { activeItem: "Recent Blogs" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Grid>
          <Menu
            pointing
            secondary
            vertical
            style={{
              height: "100vh",
              overflow: "hidden",
              backgroundColor: "rgba(255,255,255,0.4)",
              width: "110%",
              paddingTop: "15px",
            }}
          >
            <Link to="/front/recent">
              <Menu.Item
                name="Recent Blogs"
                active={activeItem === "Recent Blogs"}
                onClick={this.handleItemClick}
                style={{
                  color: "black",
                  height: "40px",
                  fontSize: "1.5rem",
                  textAlign: "center",
                  paddingTop: "25px",
                  paddingBotton: "25px",
                  marginTop: "30px",
                  marginBottom: "30px",
                }}
              />
            </Link>
            <Link to="/front/technical">
              <Menu.Item
                name="Technical Blogs"
                active={activeItem === "Technical Blogs"}
                onClick={this.handleItemClick}
                style={{
                  color: "black",
                  height: "40px",
                  fontSize: "1.5rem",
                  textAlign: "center",
                  paddingTop: "25px",
                  paddingBotton: "25px",
                  marginTop: "30px",
                  marginBottom: "30px"
                }}
              />
            </Link>
            <Link to="/front/non-technical">
              <Menu.Item
                name="Non-Technical Blogs"
                active={activeItem === "Non-Technical Blogs"}
                onClick={this.handleItemClick}
                style={{
                  color: "black",
                  height: "40px",
                  fontSize: "1.5rem",
                  textAlign: "center",
                  paddingTop: "25px",
                  paddingBotton: "25px",
                  marginTop: "30px",
                  marginBottom: "30px"
                }}
              />
            </Link>
            <Link to="/front/interview-experiences">
              <Menu.Item
                name="Interview-Experiences"
                active={activeItem === "Interview-Experiences"}
                onClick={this.handleItemClick}
                style={{
                  color: "black",
                  height: "40px",
                  fontSize: "1.5rem",
                  textAlign: "center",
                  paddingTop: "25px",
                  paddingBotton: "25px",
                  marginTop: "30px",
                  marginBottom: "30px"
                }}
              />
            </Link>
            <Link to="/front/research">
              <Menu.Item
                name="Research Blogs"
                active={activeItem === "Research Blogs"}
                onClick={this.handleItemClick}
                style={{
                  color: "black",
                  height: "40px",
                  fontSize: "1.5rem",
                  textAlign: "center",
                  paddingTop: "25px",
                  paddingBotton: "25px",
                  marginTop: "30px",
                  marginBottom: "30px"
                }}
              />
            </Link>
          </Menu>
      </Grid>
    );
  }
}
