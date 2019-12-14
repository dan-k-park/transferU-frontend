import React, { Component } from 'react';
import UserEvents from './UserEvents'
import { Grid, Image, Segment, Header } from 'semantic-ui-react'

const square = { width: 175, height: 175 }


class UserProfile extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      userEvents: [],
    }

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

  getUserEvents () {
    const userEventsCopy = [...this.state.userEvents]
    this.props.joins.forEach(join => {
      if (join.user.id == this.userId) {
        userEventsCopy.push(join.event)
      }
    })
    return userEventsCopy
  }

  componentWillUpdate() {
    if (this.state.userEvents != this.getUserEvents()) {
      this.setState({userEvents: this.getUserEvents()})
    }  
  }

  renderUserEvents = () => {
    console.log(this.state.userEvents)
    // this.state.userEvents.map(userEvent => <UserEvents event={userEvent}/>)
  }

  render() {

    const { name, age, bio, imgUrl, school } = this.getUser()
    
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
            {this.renderUserEvents()}
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