import React from 'react';
import EventCard from '../components/EventCard'

const EventContainer = props => {
  // Pass in an add event method as a prop here
  // see mod 4 code challenge for reference
  const renderEvents = () => {
     return props.events.map(event => {
       return <EventCard key={event.id} event={event} />
     })
  }

  return (
    <div className="ui four column grid">
    		<div className="row">
    		  {/*...and here..*/}
					{renderEvents()}
    		</div>
  	  </div>
  )
}

export default EventContainer