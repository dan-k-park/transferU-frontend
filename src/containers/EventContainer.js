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
<<<<<<< HEAD
    <Container>
      <br></br>
      <Card.Group itemsPerRow='3'>
        {renderEvents()}
      </Card.Group>
    </Container>
=======
    <div className='center'>
      <Container>
        <Card.Group itemsPerRow='3'>
          {renderEvents()}
        </Card.Group>
      </Container>
    </div>
>>>>>>> cb9e3904d4b7bbbf823cfc5a0aba7b21e3ad2771
  )
}

export default EventContainer