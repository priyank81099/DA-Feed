import React, { Component } from 'react'
import image from '../../img/about.png'
import Navbar from '../FrontPage/Navbar'
import { Accordion, Icon } from 'semantic-ui-react'
import './Style.css'

class Help extends Component {
    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state
        return (
            <React.Fragment>
            <Navbar/>
            <div className="common">
                <h1 style={{textAlign:'center'}}>Help & Support</h1>
                <img src={image} alt="help" className="about_img"/>
                <p className="content"><b>Need Some Help?</b> Below is some frequently asked questions which may help you.
                We're dedicated to giving you the very best of our service.
                If you have any other questions or comments, please don't hesitate to contact us.</p>
                <h1>FAQs</h1>
                <hr/>
                <div>
                <Accordion>
                    <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={this.handleClick}
                    >
                    <Icon name='dropdown' />
                    Do i need Login for read blog ?
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                    <p>
                    No,You don't. But, If you want to write blog or comment then you should login.
                    </p>
                    </Accordion.Content>

                    <Accordion.Title
                    active={activeIndex === 1}
                    index={1}
                    onClick={this.handleClick}
                    >
                    <Icon name='dropdown' />
                    What should i do if i forgot my account password ?
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                    <p>
                    If you forget password then you can set new password. 
                    For setting new password click on forget password, 
                    you will get link for set new password if you can’t find in inbox then check spam folder.
                    </p>
                    </Accordion.Content>
                </Accordion>
                </div>
            </div>
            </React.Fragment>
        )
    }
}


export default Help
