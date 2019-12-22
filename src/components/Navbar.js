import React from 'react';
import { Link } from "react-router-dom";

import { Menu, Dropdown } from 'semantic-ui-react'


const Navbar = props => {

  filterAcademic = () => {
    this.props.filterEvents('Academic')
  }

  filterAthletic = () => {
    this.props.filterEvents('Athletic')
  }

  filterOutdoor = () => {
    this.props.filterEvents('Outdoor')
  }

  filterSocial = () => {
    this.props.filterEvents('Social')
  }

  filterOther = () => {
    this.props.filterEvents('Other')
  }

  unFilter = () => {
    this.props.filterEvents('All')
  }

  const currentUser = props.currentUser;
  const loggedIn = !!props.currentUser.id;

    return (
      <Menu secondary inverted size='massive' color='teal'>
        <Menu.Item as={Link} to='/events' onClick={this.unFilter}>
          <h2 className='WhiteText'>TransferU</h2>
        </Menu.Item>
        <Menu.Item position={'right'}>
          <Dropdown text='Filter'>
            <Dropdown.Menu direction={'left'} >
              <Dropdown.Item text='Academic' onClick={this.filterAcademic}/>
              <Dropdown.Item text='Athletic' onClick={this.filterAthletic}/>
              <Dropdown.Item text='Outdoor' onClick={this.filterOutdoor}/>
              <Dropdown.Item text='Social' onClick={this.filterSocial}/>
              <Dropdown.Item text='Other' onClick={this.filterOther}/>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown text={loggedIn ? currentUser.profile.name : null}>

          {loggedIn ? (
            <Dropdown.Menu direction={'left'}>
              <Dropdown.Item as={Link} to='/users/1' text='My Profile' />
              <Dropdown.Item as={Link} to='/new_event' text='New Event' />
              <Dropdown.Divider />
              <Dropdown.Item text='Sign Out' 
                onCLick={() => {
                  props.handleLogout();
                  props.history.push('/login')
                }}>
              </Dropdown.Item>
            </Dropdown.Menu>

          ) : (
            <Menu.Item as={Link} to='/login'>Sign In</Menu.Item>
          )}

          </Dropdown>
        </Menu.Item>
      </Menu>
    )
}

export default Navbar;