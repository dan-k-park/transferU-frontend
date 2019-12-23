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
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login')
    } else {
      api.auth.getCurrentUser().then(user => {
        if (user.error) {
          this.props.history.push('/login')
        } else {
          api.events.getEvents().then(events => {
            this.setState({
              events: events,
              displayEvents: events,
            })
          })
        }
      })
    }
  }

  // Pass in an add event method as a prop here
  // see mod 4 code challenge for reference
  renderEvents = () => {
     return props.events.map(event => {
       return <EventCard key={event.id} event={event} />
     })
  }

  render() {
    return (
      <Container>
        <br></br>
        <Card.Group itemsPerRow='3'>
          {renderEvents()}
        </Card.Group>
      </Container>
    )
  }
}

export default EventContainer