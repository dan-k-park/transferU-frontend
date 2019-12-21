import React from 'react';
import EventCard from '../components/EventCard'
import { Card, Container, Grid } from 'semantic-ui-react'

const EventContainer = props => {
  // Pass in an add event method as a prop here
  // see mod 4 code challenge for reference
  const renderEvents = () => {
     return props.events.map(event => {
       return <EventCard key={event.id} event={event} />
     })
  }

  return (
    <div className='center'>
      <Container>
        <Card.Group itemsPerRow='3'>
          {renderEvents()}
        </Card.Group>
      </Container>
    </div>
  )
}

export default EventContainer