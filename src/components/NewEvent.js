import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

const URL = 'http://localhost:3001'

class NewEvent extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      date: '',
      attendees: 1,
      description: '',
      location: ''
    }
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

  handleSubmit = evt => {
    evt.preventDefault();

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
      this.props.handleEventAttending(event)
    })


    this.props.history.push('/events')
  }

  render() {
    return (
      <div className='ui center aligned container basic segment'>
        <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input label='Name' placeholder='Event Name' onChange={this.handleName} />
          <Form.Input label='Event Date' type='date' onChange={this.handleDate} />
        </Form.Group>
        <Form.TextArea 
         label='Description' 
          placeholder='Give a brief description of your event' 
          onChange={this.handleDesc}
        />

        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
    );
  }

}

export default NewEvent;