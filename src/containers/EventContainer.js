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
      <Grid centered>
        <Header centered size='huge'>Events at the University of Washington</Header>
        <Grid.Row columns={3}>
          <Card.Group centered itemsPerRow={3}>
            {renderEvents()}
          </Card.Group>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default EventContainer