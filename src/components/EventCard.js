import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Container, Icon, Image } from 'semantic-ui-react'

const imgUrl = 'https://picsum.photos/200/300'

const EventCard = props => {

  const { event } = props;

  return (
    <Card>
      <Image src={imgUrl} />
      <Card.Content header={event.name} />
      <Card.Content textAlign='left'>
        {event.description}
        <br></br>
        <Link to={`events/${event.id}`}>More Info</Link>
      </Card.Content>
      <Card.Content extra>
        <Icon name='user' />{event.attendees} Attending
      </Card.Content>
    </Card>
  )
}

export default EventCard;