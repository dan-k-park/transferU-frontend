import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import NewEvent from './components/NewEvent';
import EditEvent from './components/EditEvent';
import EventContainer from './containers/EventContainer';
import EventDetail from './components/EventDetail';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import { api } from './services/api';

import './App.css';

const API_ROOT = 'http://localhost:3001'

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {},
      profile: {},
      events: [],
      displayEvents: [],
      eventToEdit: {},
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchEverything();
  }

  // Auth
  login = user => {
    localStorage.setItem('token', user.jwt);
    console.log(localStorage.getItem('token'))
    this.fetchEverything();
  }
  
  logout = () => {
    this.clearEverything();
    localStorage.removeItem('token');
  }
  
  fetchEverything = () => {
    const token = localStorage.getItem('token')
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
        this.setState({
          events: events,
          displayEvents: events
        })
      })
    }
  }

  clearEverything = () => {
    this.setState({ 
      currentUser: {},
      profile: {},
      events: [],
      displayEvents: [],
      categories: [],
    });
  }

  // Profile
  editProfile = edittedProfile => {
    this.setState({ profile: edittedProfile })
  }
  
  // Events
  editEvent = edittedEvent => {
    const eventsCopy = [...this.state.events]
    const displayEventsCopy = [...this.state.displayEvents]
    const idxInEvents = eventsCopy.findIndex(event => event.id === edittedEvent.id)
    const idxIndisplayEvents = displayEventsCopy.findIndex(event => event.id === edittedEvent.id)
    eventsCopy.splice(idxInEvents, 1, edittedEvent)
    displayEventsCopy.splice(idxIndisplayEvents, 1, edittedEvent)

    this.setState({
      events: eventsCopy,
      displayEvents: displayEventsCopy,
    })
  }

  filterEvents = categoryName => {
    if (categoryName !== 'TransferU') {
      this.setState({
        displayEvents: this.state.events.filter(event => event.category.name === categoryName)
      })
    } else {
      this.setState({
        displayEvents: this.state.events
      })
    }
  }

  sortEvents = sortBy => {
    let sortedEvents = []
    switch (sortBy) {
      case 'Alphabetical':
        sortedEvents = this.state.displayEvents.sort((e1,e2) => e1.name > e2.name ? 1 : -1)
        break;
      case 'Attendees':
        sortedEvents = this.state.displayEvents.sort((e1,e2) => e1.attendees < e2.attendees ? 1 : -1)
        break;
      // Currently there's a bug where clicking newest/oldest twice reverts the sort
      // this is because it's basically undoing the sort due to displayEvents being sorted the first time
      // something to keep in mind
      case 'Newest':
        sortedEvents = this.state.displayEvents.sort((e1,e2) => this.checkDate(e1.created_at) > this.checkDate(e2.created_at) ? 1 : -1)
        break;
      case 'Oldest':
        sortedEvents = this.state.displayEvents.sort((e1,e2) => this.checkDate(e1.created_at) < this.checkDate(e2.created_at) ? 1 : -1)
        break;
      case 'Upcoming':
        sortedEvents = this.state.displayEvents.sort((e1,e2) => this.checkDate(e1.date) > this.checkDate(e2.date) ? 1 : -1)
        break;
      default:
        sortedEvents = this.state.displayEvents.sort((e1,e2) => e1.id > e2.id ? 1 : -1)
    }
    this.setState({
      displayEvents: sortedEvents
    })
  }

  checkDate = eventDate => {
    const dateArr = eventDate.split('-').map(n => parseInt(n))
    const date = new Date(dateArr[2], dateArr[0]-1, dateArr[1])
    return date
  }

  createEvent = event => {
    const eventsCopy = [...this.state.events]
    eventsCopy.unshift(event)

    this.setState({
      events: eventsCopy,
      displayEvents: eventsCopy.sort((e1,e2) => this.checkDate(e1.created_at) > this.checkDate(e2.created_at) ? 1 : -1)
    })
  }

  getEventToEdit = id => {
    this.setState({
      eventToEdit: this.state.events.find(event => event.id === id)
    })
  }

  deleteEvent = id => {
    const eventsCopy = [...this.state.events]
    const displayEventsCopy = [...this.state.displayEvents]
    const idxInEvents = eventsCopy.findIndex(event => event.id === id)
    const idxIndisplayEvents = displayEventsCopy.findIndex(event => event.id === id)
    eventsCopy.splice(idxInEvents, 1)
    displayEventsCopy.splice(idxIndisplayEvents, 1)

    this.setState({
      events: eventsCopy,
      displayEvents: displayEventsCopy,
    })

    fetch(API_ROOT + `/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  attendEvent = (event, attending) => {
    this.adjustAttendeeCount(event, 'attend')
    fetch(API_ROOT + '/event_profiles', {
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
  }

  cancelAttending = (event, id) => {
    this.adjustAttendeeCount(event, 'cancel')
    fetch(API_ROOT + `/event_profiles/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }
  
  adjustAttendeeCount = (event, action) => {
    let adjustedAttendees = event.attendees;
    action === 'attend' ? adjustedAttendees++ : adjustedAttendees--
    if (adjustedAttendees < 0) {
      adjustedAttendees = 0;
    }
    fetch(API_ROOT + `/events/${event.id}`,{
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

  
  render() {
    return (
      <Router>
        <Navbar 
          currentUser={this.state.currentUser}
          profile={this.state.profile}
          filterEvents={this.filterEvents}
          sortEvents={this.sortEvents}
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
          render={props => <Register {...props} handleLogin={this.login} />}
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
          school_address={this.state.profile.school.address} 
          categories={this.state.categories} 
          currentUser={this.state.currentUser}
          profile={this.state.profile}
          />}
        />

        <Route path='/events/:id' render={props => <EventDetail {...props} 
          events={this.state.events} 
          currentUser={this.state.currentUser}
          profile={this.state.profile}
          attendEvent={this.attendEvent} 
          cancelAttending={this.cancelAttending} 
          deleteEvent={this.deleteEvent}
          editEvent={this.getEventToEdit} />} 
        />

        <Route path='/profiles/:id' render={props => <UserProfile {...props} 
          currentUser={this.state.currentUser}
          profile={this.state.profile} 
          events={this.state.events}
          /> } 
        />

        <Route path='/edit_profile/:id' render={props => <EditProfile {...props}
          editProfile={this.editProfile}
          profile={this.state.profile}
          /> } 
        />

        <Route path='/edit_event/:id' render={props => <EditEvent {...props}
          editEvent={this.editEvent}
          categories={this.state.categories} 
          event={this.state.eventToEdit}
          /> } 
        />
      </Router>
    )
  }
}
export default App;
