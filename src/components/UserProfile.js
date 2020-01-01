import React, { Component } from 'react';
import UserEvents from './UserEvents';
import { Link } from 'react-router-dom';

import { Grid, Button, Divider, Segment, Header, Image, Container } from 'semantic-ui-react'

const square = { width: 175, height: 175 }

class UserProfile extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      profile: {},
      joins: [],
      contentLoaded: false,
    }
  }

  componentDidMount() {
    this.setState({
      profile: this.props.profile,
      joins: this.props.joins,
      contentLoaded: true,
    })
  }

  getUserEvents = () => {
    return this.state.joins.map(join => {
      return join.event
    })
  }
  
  render() {

    const userEvents = this.getUserEvents();

    return (
      <>
        { this.state.contentLoaded ? 
          <div className='ui center aligned container'>
            <Segment>
              <Grid>
                <Grid.Column width={4}>
                  <Segment circular style={square}>
                    <Image style={{'fontSize':62}} avatar src={this.state.profile.avatarURL}/>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={4} textAlign={'left'}>
                  <br></br>
                  <h2>{this.state.profile.name} ({this.state.profile.age})</h2>
                  <h3>{this.state.profile.school.name}</h3>
                </Grid.Column>
                <Grid.Column width={4} floated='right'>
                  <Button as={Link} to={`/edit_profile/${this.state.profile.id}`} color='teal' floated='right'>
                    Edit Profile
                  </Button>
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
                {userEvents.map(userEvent => <UserEvents event={userEvent} key={userEvent.id}/>)}
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header size='large'>Friends</Header>
                <Divider />
                <h2>None lol</h2>
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