import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import NewEvent from './components/NewEvent';
import EventContainer from './containers/EventContainer';
import EventDetail from './components/EventDetail';
import UserProfile from './components/UserProfile';
import { api } from './services/api';

import './App.css';

const URL = 'http://localhost:3001'

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {},
      profile: {},
      events: [],
      displayEvents: [],
      categories: [],
      joins: [],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      api.auth.getCurrentUser().then(user => {
        const profile = api.profile.getUserProfile(user)
        this.setState({ currentUser: user });
        return profile
      })
      .then(profile => {
        const categories = api.events.getCategories()
        this.setState({ profile: profile })
        return categories
      })
      .then(categories => {
        const events = api.events.getEvents(this.state.profile.school);
        this.setState({ categories: categories })
        return events
      })
      .then(events => {
        const joins = api.events.getJoins(this.state.profile)
        this.setState({
          events: events,
          displayEvents: events
        })
        return joins
      })
      .then(joins => {
        this.setState({ joins: joins })
      })
    }
  }

  // Login/logout methods
  login = data => {
    localStorage.setItem('token', data.jwt);
    this.setState({ currentUser: data });
  }

  logout = () => {
    localStorage.removeItem('token');
    this.setState({ 
      currentUser: {},
      profile: {},
      events: [],
      displayEvents: [],
      categories: [],
      joins: [],
    });
  }

  filterEvents = categoryName => {
    if (categoryName !== 'All') {
      this.setState({
        displayEvents: this.state.events.filter(event => event.category.name === categoryName)
      })
    } else {
      this.setState({
        displayEvents: this.state.events
      })
    }
  }

  createEvent = event => {
    const eventsCopy = [...this.state.events]
    eventsCopy.push(event)

    this.setState({events: eventsCopy})
  }

  findJoin = event => {
    return this.state.joins.find(join => join.event.id === event.id)
  }

  attendEvent = (event, attending) => {
    this.adjustAttendeeCount(event, 'attend')
    fetch(URL + '/event_profiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        event_profile: {
          profile_id: this.state.profile.id,
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
    if (adjustedAttendees < 0) {
      adjustedAttendees = 0;
    }
    fetch(URL + `/events/${event.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        attendees: adjustedAttendees
      })
    })
    .then(() => {
      return api.events.getEvents(this.state.profile.school)
    })
    .then(events => {
      this.setState({
        events: events,
        displayEvents: events,
      })
    })
  }

  cancelAttending = (event, id) => {
    this.adjustAttendeeCount(event, 'cancel')
    fetch(URL + `/event_profiles/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(() => {
      return api.events.getJoins(this.state.profile)
    })
    .then(joins => {
      this.setState({
        joins: joins
      })
    })
  }
  
  render() {
    return (
      <Router>
        <Navbar 
          currentUser={this.state.currentUser}
          profile={this.state.profile}
          filterEvents={this.filterEvents}
          handleLogout={this.logout}
        />

        <Route
          path='/login'
          exact
          render={props => <Login {...props} handleLogin={this.login} />}
        />

        <Route
          path='/register'
          exact
          render={props => <Register {...props} />}
        />

        <Route 
          path='/'
          exact
          render={props =>  <EventContainer {...props} events={this.state.displayEvents} /> }
        />

        <Route 
          path='/new_event'
          exact
          render={(props) => <NewEvent {...props} 
          createEvent={this.createEvent} 
          attendEvent={this.attendEvent} 
          school_address={this.state.users[0].school.address} 
          categories={this.state.categories} />}
        />

        <Route path='/events/:id' render={props => <EventDetail {...props} 
          events={this.state.events} 
          findJoin={this.findJoin}
          attendEvent={this.attendEvent} 
          cancelAttending={this.cancelAttending} 
          refreshJoins={this.getJoins} />} 
        />

        <Route path='/profiles/:id' render={props => <UserProfile {...props} 
          profile={this.state.profile} 
          joins={this.state.joins}
          /> } 
        />
      </Router>
    )
  }
}
export default App;
