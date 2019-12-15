import React, { Component } from 'react';
import UserEvents from './UserEvents'
import { Grid, Image, Segment, Header } from 'semantic-ui-react'

const square = { width: 175, height: 175 }


class UserProfile extends Component {
  
  constructor(props) {
    super(props)
    this.userId = this.props.match.params.id
  }

  getUser = () => {
    let userOutput = {name: 'N/A', age: 0, bio: 'N/A', imgUrl: 'N/A', school: {}}
    this.props.users.forEach(user => {
      if (user.id == this.userId) {
        userOutput = user
      }
    })
    return userOutput
  }

  getUserEventsJoins = () => {
    return this.props.joins.filter(join => join.user.id == this.props.match.params.id);
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
            <Grid.Column width={4}>
              <h2>{name}</h2>
              <h3>{age}</h3>
              <h4>{school.name}</h4>
              <p>{bio}</p>
            </Grid.Column>
          </Grid>
      </Segment>
      <Grid>
        <Grid.Column width={8}>
          <Segment>
            <Header size='large'>Events</Header>
            {console.log(userEvents)}
            {userEvents.map(userEvent => <UserEvents event={userEvent} key={userEvent.id}/>)}
          </Segment>
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment>
            <h1>Friends</h1>

          </Segment>
        </Grid.Column>
      </Grid>
     </div>
    )  
  }
}

export default UserProfile;