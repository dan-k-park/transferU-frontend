import React, { Component } from 'react';
import EventCard from '../components/EventCard';
import { Card, Container } from 'semantic-ui-react';

class EventContainer extends Component {
  
  constructor() {
    super()
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login')
    }
  }
  
  renderEvents = () => {
    return this.props.events.map(event => {
      return <EventCard key={event.id} event={event} />
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