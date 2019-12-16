import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import NewEvent from './components/NewEvent';

import FbLogin from './components/FbLogin';
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
    }
  }

  componentDidMount() {
   
    fetch(URL + '/users')
    .then(res => res.json())
    .then(users => {
      this.setState({users: users})
    })

     fetch(URL + '/schools')
    .then(res => res.json())
    .then(schools => {
      this.setState({schools: schools})
    })

    fetch(URL + '/events')
    .then(res => res.json())
    .then(events => {
      this.setState({events: events})
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

    this.setState({
      events: eventsCopy,
    })
  }

  handleEventAttending = event => {
    fetch(URL + '/event_users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        event_user: {
          user_id: this.state.users[0].id,
          event_id: event.id
        }
      })
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
          render={(props) => <NewEvent {...props} createEvent={this.createEvent} handleEventAttending={this.handleEventAttending}/>}
        />

        <Route path='/events/:id' render={props => <EventDetail {...props} events={this.state.events} handleEventAttending={this.handleEventAttending}  />} />
        <Route path='/users/:id' render={props => <UserProfile {...props} users={this.state.users} schools={this.state.schools} /> } />
      </Router>
    )
  }
}
export default App;
