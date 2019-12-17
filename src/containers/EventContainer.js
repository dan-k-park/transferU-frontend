import React from 'react';
import EventCard from '../components/EventCard'
import { Container, Grid } from 'semantic-ui-react'

const EventContainer = props => {
  // Pass in an add event method as a prop here
  // see mod 4 code challenge for reference
  const renderEvents = () => {
     return props.events.map(event => {
       return <EventCard key={event.id} event={event} />
     })
  }

  return (
    <Grid centered columns={3}>
      <Grid.column>
        {renderEvents()}
      </Grid.column>
    </Grid>
  )
}

export default EventContainer