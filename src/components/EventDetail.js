import React, { Component } from 'react';
import EventLocationMap from './EventLocationMap';
import { Link } from "react-router-dom";
import { Segment, Button } from 'semantic-ui-react';
import { api } from '../services/api';


class EventDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      event: {},
      creatorProfile: '',
      contentLoaded: false,
    }
  }
  

  componentDidMount() {
    const event = this.props.events.filter(event => event.id == this.props.match.params.id)[0]
    if (!event) {
      this.props.history.push('/')
    } else {
      api.profile.getUserProfile(event.user).then(profile => {
        this.setState({
          event: event,
          creatorProfile: profile,
          contentLoaded: true,
        })
      })
    }
  }

  getTime = () => {
    let rawTime = this.state.event.time.split(':').map(n => parseInt(n))
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

    return `${hour}:${minute} ${meridiem}`
  }

  handleAttendClick = () => {
    api.events.getJoins(this.props.profile).then(joins => {
      return joins.find(join => join.event.id === this.state.event.id)
    })
    .then(join => {
      join ? alert('You\'re already attending!') : this.props.attendEvent(this.state.event, true, false)
    })
  }

  handleCancelClick = () => {
    api.events.getJoins(this.props.profile).then(joins => {
      return joins.find(join => join.event.id === this.state.event.id)
    })
    .then(join => {
      join ? this.props.cancelAttending(this.state.event, join.id) : alert('You never signed up for this event!')
    })
  }

  handleEditClick = () => {
    this.props.editEvent(this.state.event.id)
  }

  handleDeleteClick = () => {
    this.props.deleteEvent(this.state.event.id)
    this.props.history.push('/')
  }

  render() {
    const { name, date, time, description, location, category } = this.state.event

    return (      
      <>
        {this.state.contentLoaded ?
        <div className="ui two column centered grid">
        <div className="column">
          <Segment.Group raised>
            <Segment textAlign='left'>
              <h1>Name: {name} {`(${category.name})`}</h1>
              <h1>Created by: <Link to={`/profiles/${this.state.creatorProfile.id}`} className='BlackText'>{this.state.creatorProfile.name}</Link></h1>
              <h1>When: {date} at {time}</h1>
              <h1>Descripton: </h1>
              <p>{description}</p>
                <br></br>
                <Button.Group>
                  <Button positive onClick={this.handleAttendClick}>Attend</Button>
                  <Button.Or />
                  <Button negative onClick={this.handleCancelClick}>Cancel</Button>
                </Button.Group>
                {this.state.event.user.id === this.props.currentUser.id ? 
                  <Button.Group floated='right'>
                  <Button positive as={Link} to={`/edit_event/${this.state.event.id}`} onClick={this.handleEditClick}>Edit</Button>
                  <Button.Or />
                  <Button negative onClick={this.handleDeleteClick}>Delete</Button>
                </Button.Group>
                : null}
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