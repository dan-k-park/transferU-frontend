import React, { Component } from 'react';
import UserEvents from './UserEvents'
import { Grid, Divider, Segment, Header } from 'semantic-ui-react'

const square = { width: 175, height: 175 }

const URL = 'http://localhost:3001'


class UserProfile extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      age: '',
      bio: '',
      imgUrl: '',
      eventUserJoins: []
    }
    this.userId = this.props.match.params.id
  }

  componentDidMount() {
    fetch(URL + '/event_users')
    .then(res => res.json())
    .then(joins => {
      this.setState({eventUserJoins: joins})
    })
  }

  getUser = () => {
    let userOutput = {name: this.state.name, age: this.state.age, bio: this.state.bio, imgUrl: this.state.imgUrl, school: {}}
    this.props.users.forEach(user => {
      if (user.id == this.userId) {
        userOutput = user
      }
    })
    return userOutput
  }

  getUserEventsJoins = () => {
    return this.state.eventUserJoins.filter(join => join.user.id == this.props.match.params.id && join.attending === true );
  }

  getUserEvents = () => {
    let joins = this.getUserEventsJoins()
    return joins.map(join => {
      return join.event
    })
  }
  

  render() {

    const { name, age, bio, imgUrl, school } = this.getUser()

    const userEvents = this.getUserEvents();

    return (
      <div className='ui center aligned container'>
        <Segment>
          <Grid>
            <Grid.Column width={4}>
              <Segment circular style={square}>
                <img src={imgUrl}/>
              </Segment>
            </Grid.Column>
            <Grid.Column width={4} textAlign={'left'}>
              <h2>{name} ({age})</h2>
              <h4>{school.name}</h4>
              <p>{bio}</p>
            </Grid.Column>
          </Grid>
      </Segment>
      <Grid columns='equal'>
        <Grid.Column width={10}>
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
    )  
  }
}

export default UserProfile;