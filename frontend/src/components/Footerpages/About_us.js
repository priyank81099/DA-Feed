import React, { Component } from 'react'
import image from '../../img/about.png'
import { Grid } from 'semantic-ui-react'
import Navbar from '../FrontPage/Navbar'
import './Style.css'

class About_us extends Component {
    render() {
        return (
            <React.Fragment>
            <Navbar />
            <div className="common">
                <h1 style={{textAlign:'center'}}>About Us</h1>
                <img src={image} alt="about_us" className="about_img"/>
                <p className="content">Welcome to Explore More, We're dedicated to giving you the very best of our service. 
                    We are hoping that, this website will help in explore your knowledge and improve your thinking level.
                    Our goal is to reduce knowledge path between students and expertice persons.
                    This website is created by students of DA-IICT (Gandhinagar, Gujrat).
                    This effort was made under the guidence of Prof. Manoj Raut as Research internship project.</p>
                <p className="content">We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.</p>
                <h2 style={{textAlign:'center'}}>Our Team</h2>
                <hr />
                <Grid divided='vertically'>
                <Grid.Row columns={3}>
                <Grid.Column>
                    <div style={{textAlign:'center'}}>
                    <h1>Nirmal Patel</h1>
                    <h3>[201701193]</h3>
                    </div>
                </Grid.Column>
                <Grid.Column>
                    <div style={{textAlign:'center'}}>
                    <h1>Priyank Satasiya</h1>
                    <h3>[201701183]</h3>
                    </div>
                 </Grid.Column>
                 <Grid.Column>
                     <div style={{textAlign:'center'}}>
                    <h1>Vinay Parmar</h1>
                    <h3>[201701205]</h3>
                    </div>
                 </Grid.Column>
                </Grid.Row>
                </Grid> 
            </div>
            </React.Fragment>
        )
    }
}


export default About_us

