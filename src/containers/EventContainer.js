import React, { Component } from 'react';
import EventCard from '../components/EventCard';
import { api } from '../services/api';
import { Card, Container } from 'semantic-ui-react';

class EventContainer extends Component {
  
  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login')
    }
  }
  
  renderEvents = () => {
    return this.props.events.map(event => {
      return <EventCard key={event.id} event={event} />
      // api.profile.getUserProfile(event.user).then(profile => {
      //   return profile
      // }).then(profile => {

      // })
    })
  }
  

  render() {
    return (
      <Container>
        <br></br>
        <Card.Group itemsPerRow='3'>
          {this.renderEvents()}
        </Card.Group>
      </Container>
    )
  }
}

export default EventContainer