import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';


const EventAttendee = ({ profile }) => {
  const { name, id } = profile

  return(
      <List animated verticalAlign='middle'>
        <List.Item>
        <Link to={`/profiles/${id}`} className='BlackText'>{name}</Link>
        </List.Item>
      </List>
  )
}

export default EventAttendee