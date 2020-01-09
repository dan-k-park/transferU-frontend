import React from 'react';
import { Link, withRouter } from "react-router-dom";

import { Menu, Dropdown } from 'semantic-ui-react'


const Navbar = props => {

  const handleFilter = evt => {
    props.filterEvents(evt.target.textContent)
  }

  const handleSort = evt => {
    props.sortEvents(evt.target.textContent)
  }

  const currentUser = props.currentUser;

  return (
    <Menu secondary inverted size='massive' color='teal'>
      <Menu.Item as={Link} to='/' value='All' onClick={handleFilter}>
        <h2 className='WhiteText'>TransferU</h2>
      </Menu.Item>

      {localStorage.getItem('token') ? (
        <Menu.Item position={'right'}>
          <Dropdown text='Sort'>
            <Dropdown.Menu direction={'left'} >
              <Dropdown.Item text='Alphabetical' onClick={handleSort}/>
              <Dropdown.Item text='Attendees' onClick={handleSort}/>
              <Dropdown.Item text='Newest' onClick={handleSort}/>
              <Dropdown.Item text='Oldest' onClick={handleSort}/>
              <Dropdown.Item text='Upcoming' onClick={handleSort}/>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown text='Filter'>
            <Dropdown.Menu direction={'left'} >
              <Dropdown.Item text='Academic' onClick={handleFilter}/>
              <Dropdown.Item text='Athletic' onClick={handleFilter}/>
              <Dropdown.Item text='Outdoor' onClick={handleFilter}/>
              <Dropdown.Item text='Social' onClick={handleFilter}/>
              <Dropdown.Item text='Other'onClick={handleFilter}/>
            </Dropdown.Menu>
          </Dropdown>
          <></>
          <Dropdown text={currentUser.username}>
            <Dropdown.Menu direction={'left'}>
              <Dropdown.Item as={Link} to={`/profiles/${props.profile.id}`} text='My Profile' />
              <Dropdown.Item as={Link} to='/new_event' text='New Event' />
              <Dropdown.Divider />
              <Dropdown.Item text='Sign Out' 
                onClick={() => {
                  props.handleLogout();
                  props.history.push('/login')
                }}>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        ) : (
          null
        )}
    </Menu>
  )
}

export default withRouter(Navbar);