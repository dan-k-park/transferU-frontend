import React from 'react';
import {Link} from 'react-router-dom'


const UserEvent = ({ event }) => {
  const { name, date, id } = event

  return(
    <div>
      <Link to={`events/${id}`}>{name} on {date}</Link>
    </div>
  )
}

export default UserEvent