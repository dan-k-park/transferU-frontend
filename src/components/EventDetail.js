import React, { Component } from 'react';
import EventLocationMap from './EventLocationMap';
import { Segment, Button } from 'semantic-ui-react';

const URL = 'http://localhost:3001'

class EventDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      event: {},
    }
  }
  
  componentDidMount() {
    this.setState({
      event: this.props.events.filter(event => event.id == this.props.match.params.id)[0],
    })
  }

  adjustAttendeeCount = (id, action) => {
    const adjustedAttendees = this.state.event.attendees;
    action === 'attend' ? adjustedAttendees++ : adjustedAttendees--
    fetch(URL + `/${id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        attendees: adjustedAttendees
      })
    })
  }

  handleAttendClick = () => {
    const join = this.props.findJoin(this.state.event)
    !join ? this.props.attendEvent(this.state.event, true)
    : alert('You\'re already attending this event')
  }

  handleCancelClick = () => {
    const join = this.props.findJoin(this.state.event)
    this.props.cancelAttending(this.state.event, join.id)
  }

  render() {
    const { name, date, description, location } = this.state.event

    return (      
      <div className="ui two column centered grid">
        <div className="column">
          <Segment.Group raised>
            <Segment textAlign='left'>
              <h1>Event Name: {name}</h1>
              <h1>When: {date}</h1>
              <h1>Descripton: </h1>
              <p>{description}</p>
                <br></br>
                <Button.Group>
                  <Button positive onClick={this.handleAttendClick}>Attend</Button>
                  <Button.Or />
                  <Button negative onClick={this.handleCancelClick}>Cancel</Button>
                </Button.Group>
            </Segment>
            <Segment style={{height:'660px'}}>
              <h1>Where: {location}</h1>
              <EventLocationMap location={location}/>
            </Segment>
          </Segment.Group>
        </div>
      </div>
    )
  }
}

export default EventDetail;