import React, { Component } from 'react';
import UserEvent from './UserEvent';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Grid, Button, Divider, Segment, Header, Image, Container, Tab } from 'semantic-ui-react'

const API_ROOT = 'http://localhost:3001'

// NEED TO CLEAR PROFILE DATA IF GOING TO MY PROFILE AFTER BEING ON ANOTHER USER'S PROFILE PAGE!!!

const square = { width: 175, height: 175 }

class UserProfile extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      profile: {},
      joins: [],
      createdEvents: [],
      contentLoaded: false,
    }
  }

  componentDidMount() {
    fetch(`${API_ROOT}/profiles`, {
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then(res => res.json())
    .then(profiles => {
      this.setState({ profile: {} })
      return profiles.find(profile => profile.id == this.props.match.params.id)
    })
    .then(profile => {
      this.setState({
        profile: profile,
        createdEvents: this.props.events.filter(event => event.user.id === profile.user.id),
        contentLoaded: true,
      })
      return api.events.getJoins(profile)
    })
    .then(joins => {
      this.setState({ joins: joins })
    })
  }

  getAttendingEvents = () => {
    return this.state.joins.map(join => {
      return join.event
    })
  }
  
  render() {

    const attendingEvents = this.getAttendingEvents();

    const panes = [
      { menuItem: 'Attending', render: () => <Tab.Pane>{attendingEvents.map(event => <UserEvent event={event} key={event.id}/>)}</Tab.Pane> },
      { menuItem: 'Created', render: () => <Tab.Pane>{this.state.createdEvents.map(event => <UserEvent event={event} key={event.id}/>)}</Tab.Pane> },
    ]

    return (
      <>
        { this.state.contentLoaded ? 
          <div className='ui center aligned container'>
            <Segment>
              <Grid>
                <Grid.Column width={4}>
                  <Container circular style={square}>
                    <Image style={{'fontSize':87}} avatar src={this.state.profile.avatarURL}/>
                  </Container>
                </Grid.Column>
                <Grid.Column width={4} textAlign={'left'}>
                  <br></br>
                  <h2>{this.state.profile.name} ({this.state.profile.age})</h2>
                  <h3>{this.state.profile.school.name}</h3>
                </Grid.Column>
                <Grid.Column width={4} floated='right'>
                  {this.props.currentUser.id === this.state.profile.id ? 
                  <Button as={Link} to={`/edit_profile/${this.state.profile.id}`} color='teal' floated='right'>
                    Edit Profile
                  </Button>
                  : null }
                </Grid.Column>
              </Grid>
          </Segment>
          <Grid columns='equal'>
            <Grid.Column>
                <Segment>
                  <Header size='large'>About Me</Header>
                  <Divider />
                  <Container textAlign='left'>
                    <p>{this.state.profile.bio}</p>
                  </Container>
                </Segment>
              </Grid.Column>
            <Grid.Column width={8}>
              <Segment>
                <Header size='large'>My Events</Header>
                <Divider />
                <Tab panes={panes} />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header size='large'>Friends</Header>
                <Divider />
                <h2>None</h2>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
        : null
        }
      </>
    )  
  }
}

export default UserProfile;