import React from 'react';
import EventCard from '../components/EventCard'
import { Card, Container, Grid, Header } from 'semantic-ui-react'

const EventContainer = props => {
  // Pass in an add event method as a prop here
  // see mod 4 code challenge for reference
  const renderEvents = () => {
     return props.events.map(event => {
       return <EventCard key={event.id} event={event} />
     })
  }

  return (
    <Container>
      <br></br>
      <Card.Group itemsPerRow='3'>
        {renderEvents()}
      </Card.Group>
    </Container>
  )
}

export default EventContainer