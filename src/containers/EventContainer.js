import React, { Component } from 'react';
import EventCard from '../components/EventCard';
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
    })
  }
  

  render() {
    return (
      <>
      <h2 className='CenterText'>Transfer Students at {this.props.school.startsWith('University') ? `the ${this.props.school}` : this.props.school} Have Planned:</h2>
      <Container>
        <br></br>
        <Card.Group itemsPerRow='3'>
          {this.renderEvents()}
        </Card.Group>
      </Container>
      </>
    )
  }
}

export default EventContainer