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

class NewEvent extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      date: '',
      time: '',
      attendees: 0,
      category: '',
      description: '',
      location: '',
      attending: '',
      school_address: '',
      currentUser: {},
      profile: {},
    }
  }

  componentDidMount() {
    this.setState({
      school_address: this.props.school_address,
      currentUser: this.props.currentUser,
      profile: this.props.profile,
    }) 
  }

  handleName = evt => this.setState({name: evt.target.value});

  handleDesc = evt => this.setState({description: evt.target.value});

  handleDate = evt => {
    // Reformat date value from YYYY-MM-DD to MM-DD-YYYY for user readability
    // Also take out leading zero in front of months prior to October
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

    fetch(API_ROOT + `/events`, {
      method: 'POST',
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
        school_id: this.state.profile.school.id,
        user_id: this.state.currentUser.id,
        location: this.state.location,
      })
    })
    .then(res => res.json())
    .then(event => {
      this.props.createEvent(event)
      if (this.state.attending === 'y') {
        this.props.attendEvent(event, 'attending')
      }
    })
    this.props.history.push('/')
  }

  render() {

    const { value } = this.state.attending
    return (
      <Container>
        <Segment raised>
          <Form>
          <Form.Group widths='equal'>
            <Form.Input label='Name' placeholder='Event Name' onChange={this.handleName} />
            <Form.Input label='Date' type='date' onChange={this.handleDate} />
            <Form.Input label='Time' type='time' onChange={this.handleTime} />
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
            <Form.Select
              label='Category'
              options={categories}
              placeholder='Category'
              onChange={this.handleCategory}
            />
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
          <Button color='teal' onClick={this.handleSubmit}>Submit</Button>
        </Form>
        </Segment>
      </Container>
    );
  }

}

export default NewEvent;