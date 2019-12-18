import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import NewEvent from './components/NewEvent';

import EventContainer from './containers/EventContainer';
import EventDetail from './components/EventDetail';
import UserProfile from './components/UserProfile';
import './App.css';

const URL = 'http://localhost:3001'

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      schools: [],
      events: [],
      joins: [],
    }
  }

  componentDidMount() {
    this.getUsers()
    this.getSchools()
    this.getEvents()
    this.getJoins()
  }

  getUsers = () => {
    fetch(URL + '/users')
    .then(res => res.json())
    .then(users => {
      this.setState({users: users})
    })
  }

  getSchools = () => {
    fetch(URL + '/schools')
    .then(res => res.json())
    .then(schools => {
      this.setState({schools: schools})
    })
  }

  getEvents = () => {
    fetch(URL + '/events')
    .then(res => res.json())
    .then(events => {
      this.setState({events: events})
    })
  }

  getJoins = () => {
    fetch(URL + '/event_users')
    .then(res => res.json())
    .then(joins => {
      this.setState({joins: joins})
    })
  }

  createUser = (name, imgUrl) => {
    fetch(URL + '/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        name: name,
        imgUrl: imgUrl
      })
    })
  }

  createEvent = event => {
    const eventsCopy = [...this.state.events]
    eventsCopy.push(event)

    this.setState({events: eventsCopy})
  }

  findJoin = event => {
    return this.state.joins.find(join => join.event.name === event.name)
  }

  attendEvent = (event, attending) => {
    this.adjustAttendeeCount(event, 'attend')
    fetch(URL + '/event_users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        event_user: {
          user_id: this.state.users[0].id,
          event_id: event.id,
          attending: attending,
        }
      })
    })
    .then(res => res.json())
    .then(newJoin => {
      const joinsCopy = [...this.state.joins]
      joinsCopy.push(newJoin)
      this.setState({joins: joinsCopy})
    })
  }

  adjustAttendeeCount = (event, action) => {
    let adjustedAttendees = event.attendees;
    action === 'attend' ? adjustedAttendees++ : adjustedAttendees--
    fetch(URL + `/events/${event.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        attendees: adjustedAttendees
      })
    })
    .then(() => {
      this.getEvents();
    })
  }

  cancelAttending = (event, id) => {
    this.adjustAttendeeCount(event, 'cancel')
    fetch(URL + `/event_users/${id}`, {
      method: 'DELETE'
    })
  }
  
  render() {
    return (
      <Router>
        {/* {!this.state.loggedIn ? <FbLogin /> : <EventContainer events={this.state.events} />} */}
        <Navbar currentUser={this.state.users[0]}/>
        <Route 
          path='/events'
          exact
          render={() =>  <EventContainer events={this.state.events} /> }
        />

        <Route 
          path='/new_event'
          exact
          render={(props) => <NewEvent {...props} createEvent={this.createEvent} attendEvent={this.attendEvent} school_address={this.state.users[0].school.address} />}
        />

        <Route path='/events/:id' render={props => <EventDetail {...props} 
          events={this.state.events} 
          findJoin={this.findJoin}
          attendEvent={this.attendEvent} 
          cancelAttending={this.cancelAttending} />} 
        />

        <Route path='/users/:id' render={props => <UserProfile {...props} 
          users={this.state.users} 
          schools={this.state.schools} /> } 
        />
      </Router>
    )
  }
}
export default App;
