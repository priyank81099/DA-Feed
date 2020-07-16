import React from 'react';
import './front.css';
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from './Navbar.js';
import Sidebar from './Sidebar.js';
import Recent from '../allpages/Recent.js';
import Technical from '../allpages/Technical.js';
import NonTechnical from '../allpages/Non-Technical.js';
import Research from '../allpages/Research.js';
import InterviewExperience from '../allpages/Interview-Experiences.js';
import CreateBlog from "./createblog";
import { Grid } from "semantic-ui-react";

const Front = () => {
  return (
    <div>
      <Grid>
        <Grid.Row stretched><Navbar /></Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column stretched width={12}>
            <div>
              <Redirect to="/front/recent" />
              <Switch>
                <Route path="/front/recent" component={Recent} />
                <Route path="/front/technical" component={Technical} />
                <Route path="/front/non-technical" component={NonTechnical} />
                <Route path="/front/interview-experiences" component={InterviewExperience} />
                <Route path="/front/research" component={Research} />
                <Route parh="/front/create-blog" component={CreateBlog} />
              </Switch>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Front;
