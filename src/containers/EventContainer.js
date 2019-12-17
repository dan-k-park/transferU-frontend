import React from 'react';
import EventCard from '../components/EventCard'
import { Card, Grid } from 'semantic-ui-react'

const EventContainer = props => {
  // Pass in an add event method as a prop here
  // see mod 4 code challenge for reference
  const renderEvents = () => {
     return props.events.map(event => {
       return <EventCard key={event.id} event={event} />
     })
  }

  return (
    <div className='CardContainer'>

      <Grid centered>
        <Grid.Row columns={3}>
          <Card.Group centered itemsPerRow={3}>
            {renderEvents()}
          </Card.Group>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default EventContainer