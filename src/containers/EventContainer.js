import React, { Component } from 'react';
import { api } from '../services/api';
import EventCard from '../components/EventCard';
import { Card, Container } from 'semantic-ui-react';

class EventContainer extends Component {

  constructor() {
    super();
    this.state = {
      events: [],
      displayEvents: [],
    }
  }

  // On componentDidMount, redirects to login if there're any login errors
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({
        events: this.props.events,
        displayEvents: this.props.displayEvents,
      })
    } else {
      this.props.history.push('/login')
    }
  }

  // Pass in an add event method as a prop here
  // see mod 4 code challenge for reference
  renderEvents = () => {
    //  return this.state.events.map(event => {
    //    return <EventCard key={event.id} event={event} />
    //  })
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