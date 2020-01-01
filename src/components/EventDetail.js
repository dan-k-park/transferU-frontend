import React, { Component } from 'react';
import EventLocationMap from './EventLocationMap';
import { Segment, Button } from 'semantic-ui-react';

class EventDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      event: {},
      join: {},
      contentLoaded: false,
    }
  }
  
  componentDidMount() {
    const event = this.props.events.filter(event => event.id == this.props.match.params.id)[0]
    const join = this.props.findJoin(event)
    this.setState({
      event: event,
      join: join,
      contentLoaded: true,
    })
  }

  handleAttendClick = () => {
    if (this.state.join) {
      alert('You\'re already attending this event')
    } else {
      this.props.attendEvent(this.state.event, true)
    }
  }

  handleCancelClick = () => {
    if (this.state.join) {
      this.props.cancelAttending(this.state.event, this.state.join.id)
    } else {
      alert('You never signed up for this event')
    }
  }

  render() {
    const { name, date, description, location, category } = this.state.event

    return (      
      <>
        {this.state.contentLoaded ?
        <div className="ui two column centered grid">
        <div className="column">
          <Segment.Group raised>
            <Segment textAlign='left'>
              <h1>Name: {name} {`(${category.name})`}</h1>
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
              <EventLocationMap location={location} api={this.props.api}/>
            </Segment>
          </Segment.Group>
        </div>
      </div>
        : null}
      </>
    )
  }
}

export default EventDetail;