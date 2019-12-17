import React, { Component } from 'react';
import EventLocationMap from './EventLocationMap';
import { Segment, Button } from 'semantic-ui-react';

class EventDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      event: {},
      join: {},
    }
    this.eventId = this.props.match.params.id
  }
  
  componentDidMount() {
    this.setState({
      event: this.props.events.filter(event => event.id == this.props.match.params.id)[0],
      join: this.props.joins.filter(join => join.event.id == this.props.match.params.id )
    })
  }

  handleAttendClick = () => {
    if (this.state.join !== {}) {
      this.props.handleEventAttending(this.state.join.id, true)
    } else {
      this.props.handleNewEventAttending(this.state.event, true)
    }
  }

  handleCancelClick = () => {
    this.props.handleEventAttending(this.state.join.id, false)
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
                  <Button positive onClick={this.handleAttendClick()}>Attend</Button>
                  <Button.Or />
                  <Button cancel onClick={this.handleCancelClick()}>Cancel</Button>
                </Button.Group>
            </Segment>
            <Segment style={{height:'500px'}}>
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