import React, { Component } from 'react';
import EventCreationMap from './EventCreationMap';
import { Form, Container, Segment } from 'semantic-ui-react';

const URL = 'http://localhost:3001'

class NewEvent extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      date: '',
      attendees: 0,
      description: '',
      location: '',
      attending: '',
      school_address: ''
    }
  }

  componentDidMount() {
    this.setState({school_address: this.props.school_address}) 
  }

  handleName = evt => this.setState({name: evt.target.value});

  handleDesc = evt => this.setState({description: evt.target.value});

  handleDate = evt => {
    // Reformat date value from YYYY-MM-DD to MM-DD-YYYY for user readability
    let dateArr = evt.target.value.split("-");
    let year = dateArr.shift()
    dateArr.push(year)
    let eventDate = dateArr.join("-")

    this.setState({date: eventDate})
  }

  handleLocation = evt => {
    this.setState({location: evt.target.value})
  }

  handleAttending = (evt, { value }) => {
    this.setState({attending: value})
  }

  handleSubmit = evt => {
    evt.preventDefault();
    
    if (this.state.attending === 'y') {
      this.setState({attendees: 1})
    }

    fetch(URL + `/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        date: this.state.date,
        description: this.state.description,
        attendees: this.state.attendees,
        location: this.state.location,
      })
    })
    .then(res => res.json())
    .then(event => {
      this.props.createEvent(event)
      this.state.attending === 'y' ? this.props.handleNewEventAttending(event, true) : this.props.handleNewEventAttending(event, false)
    })
    this.props.history.push('/events')
  }

  render() {

    const { value } = this.state.attending
    return (
      <Container>
        <Segment raised>
          <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input label='Name' placeholder='Event Name' onChange={this.handleName} />
            <Form.Input label='Date' type='date' onChange={this.handleDate} />
          </Form.Group>
          <Form.TextArea 
          label='Description' 
            placeholder='Give a brief description of your event' 
            onChange={this.handleDesc}
          />
          <Form.Input label='Location' placeholder='Use the map as a guide to find a suitable location' onChange={this.handleLocation}/>
          <Segment basic style={{height:'600px'}}>
            <EventCreationMap location={this.state.school_address}/>
          </Segment>

          <Form.Group inline>
            <label>Will You Be Attending?</label>
            <Form.Radio
              label='Yes'
              value='y'
              checked={value === 'y'}
              onChange={this.handleAttending}
            />
            <Form.Radio
              label='No'
              value='n'
              checked={value === 'n'}
              onChange={this.handleAttending}
            />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
        </Segment>
      </Container>
    );
  }

}

export default NewEvent;