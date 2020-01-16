import React, { Component } from 'react';
import EventCreationMap from './EventCreationMap';
import { Button, Form, Container, Segment } from 'semantic-ui-react';

const API_ROOT = 'http://localhost:3001'

const categories = [
  { key: 'out', text: 'Outdoor', value: 'Outdoor' },
  { key: 'soc', text: 'Social', value: 'Social' },
  { key: 'ath', text: 'Athletic', value: 'Athletic' },
  { key: 'aca', text: 'Academic', value: 'Academic' },
  { key: 'oth', text: 'Other', value: 'Other' },
]

class EditEvent extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      date: '',
      time: '',
      location: '',
      description: '',
      attendees: 0,
      category_id: null,
      school_id: null,
      user_id: null
    }
  }

  componentDidMount() {
    this.setState({
      name: this.props.event.name,
      date: this.props.event.date,
      time: this.props.event.time,
      location: this.props.event.location,
      description: this.props.event.description,
      attendees: this.props.event.attendees,
      user_id: this.props.event.user_id,
      category_id: this.props.event.category_id,
      school_id: this.props.event.school_id,
    }) 
  }

  handleName = evt => this.setState({name: evt.target.value});

  handleDesc = evt => this.setState({description: evt.target.value});

  handleDate = evt => {
    // Reformat date value from YYYY-MM-DD to MM-DD-YYYY for user readability
    let dateArr = evt.target.value.split("-");
    let year = dateArr.shift()
    let month = parseInt(dateArr.shift())
    dateArr.push(year)
    dateArr.unshift(month)
    let eventDate = dateArr.join("-")

    this.setState({date: eventDate})
  }

  handleTime = evt => {
    let rawTime = evt.target.value.split(':').map(n => parseInt(n))
    let hour = ''
    let minute = ''
    let meridiem = ''

    // Check minutes as parseInt will get rid of leading zeros
    // ex ['12', '05] becomes [12, 5]
    if (rawTime[1] < 10) {
      minute = '0' + rawTime[1];
    } else {
      minute = rawTime[1].toString();
    }

    if (rawTime[0] === 0) {
      hour = '12';
      meridiem = 'am';
    } else if (rawTime[0] > 0 && rawTime[0] < 12) {
      hour = rawTime[0].toString();
      meridiem = 'am';
    } else {
      hour = (rawTime[0] - 12).toString();
      meridiem = 'pm'
    }

    this.setState({ time: `${hour}:${minute} ${meridiem}` })
  }


  handleLocation = evt => {
    this.setState({location: evt.target.value})
  }

  handleAttending = (evt, { value }) => {
    this.setState({attending: value})
  }

  handleCategory =(evt, {value}) => this.setState({category: value})

  findCategoryID = () => {
    let idx = this.props.categories.findIndex(category => (category.name === this.state.category))
    return this.props.categories[idx].id;
  }

  handleSubmit = evt => {
    evt.preventDefault();
    let category_id = this.findCategoryID();
    
    if (this.state.attending === 'y') {
      this.setState({attendees: 1})
    }

    fetch(API_ROOT + `/events/${this.props.event.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: this.state.name,
        date: this.state.date,
        time: this.state.time,
        description: this.state.description,
        attendees: this.state.attendees,
        category_id: category_id,
        school_id: this.state.id,
        user_id: this.state.user_id,
        location: this.state.location,
      })
    })
    .then(res => res.json())
    .then(event => {
      // Edit event in App's state
      this.props.editEvent(event);
      this.props.history.push('/');
    })
  }

  render() {
    return (
      <Container>
        <Segment raised>
          <Form>
          <Form.Group widths='equal'>
            <Form.Input label='Name' placeholder={this.state.name} onChange={this.handleName} />
            <Form.Input label='Date' type='date' placeholder={this.state.date} onChange={this.handleDate} />
            <Form.Input label='Time' type='time' onChange={this.handleTime} />
          </Form.Group>
          <Form.TextArea 
          label='Description' 
            placeholder={this.state.description}
            onChange={this.handleDesc}
          />
          <Form.Input label='Location' placeholder={this.state.location} onChange={this.handleLocation}/>
          <Segment basic style={{height:'600px'}}>
            <EventCreationMap location={this.state.location}/>
          </Segment>

          <Form.Group inline>
            <Form.Select
              label='Category'
              options={categories}
              placeholder='Category'
              onChange={this.handleCategory}
            />
           
          </Form.Group>
          <Button color='teal' onClick={this.handleSubmit}>Submit</Button>
        </Form>
        </Segment>
      </Container>
    );
  }
}

export default EditEvent;