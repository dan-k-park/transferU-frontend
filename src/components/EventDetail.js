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
      join: {},
      contentLoaded: false,
    }
  }
  
  componentDidMount() {
    const event = this.props.events.filter(event => event.id == this.props.match.params.id)[0]
    const join = this.props.findJoin(event)

    api.profile.getUserProfile(event.user).then(profile => {
      this.setState({
        event: event,
        creatorProfile: profile,
        join: join,
        contentLoaded: true,
      })
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

  handleEditClick = () => {
    this.props.editEvent(this.state.event.id)
  }

  handleDeleteClick = () => {
    this.props.deleteEvent(this.state.event.id)
    this.props.history.push('/')
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
              <h1>Created by: <Link to={`/profiles/${this.state.creatorProfile.id}`} className='BlackText'>{this.state.creatorProfile.name}</Link></h1>
              <h1>When: {date}</h1>
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