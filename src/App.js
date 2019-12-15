import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/Navbar';

import FbLogin from './components/FbLogin';
import EventContainer from './containers/EventContainer';
import EventCard from './components/EventCard';
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
  
  render() {
    return (
      <Router>
        {/* {!this.state.loggedIn ? <FbLogin /> : <EventContainer events={this.state.events} />} */}
        <Navbar />
        <Route 
          path='/events'
          exact
          render={() =>  <EventContainer events={this.state.events} /> }
        />

        <Route path='/events/:id' render={props => <EventCard {...props} events={this.state.events} />} />
        <Route path='/users/:id' render={props => <UserProfile {...props} users={this.state.users} schools={this.state.schools} /> } />
      </Router>
    )
  }
}
export default App;
