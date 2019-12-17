import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Icon } from 'semantic-ui-react'


const EventCard = props => {

  const { event } = props;

  return (
    <div className='ui column'>
      <Card fluid>
        <Card.Content header={event.name} />
        <Card.Content >
          {event.description}
          <br></br>
          <Link to={`events/${event.id}`}>More Info</Link>
        </Card.Content>
        <Card.Content extra>
          <Icon name='user' />{event.attendees} Attending
        </Card.Content>
      </Card>
    </div>
  )

}

export default EventCard;