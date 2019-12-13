import React from 'react';

const EventCard = ({ events, match }) => {

  const getEvent = () => {
    let eventId = match.params.id;
    let output = { name: 'N/A', date: 'N/A', description: 'N/A', location: 'N/A', attendees: 'N/A'}
    events.forEach(event => {
      if (event.id == eventId) {
        output = event
      }
    });
    return output
  }

  const { name, date, description, location, attendees } = getEvent();

  return (
    <div className="ui two column centered grid">
      <div className="column">
        <div className="ui raised center aligned segment">
          <h1>{name} | {date}</h1>
          <h2>{location}</h2>
          <p>
            {description}
            <br></br>
            Number Attending: {attendees}
          </p>
        </div>
      </div>
    </div>
  )
}

export default EventCard;