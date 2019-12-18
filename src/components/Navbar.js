import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Menu, Dropdown } from 'semantic-ui-react'


class Navbar extends Component {

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

  render() {

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
          <Dropdown text={this.props.currentUser ? this.props.currentUser.name : 'User'}>
            <Dropdown.Menu direction={'left'}>
              <Dropdown.Item as={Link} to='/users/1' text='My Profile' />
              <Dropdown.Item as={Link} to='/new_event' text='New Event' />
              <Dropdown.Divider />
              <Dropdown.Item>
                <h3><a href='http://ditzbitz.com/sheephole.html' className='BlackText'>Logout</a></h3>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu>
    )
  }
}

export default Navbar;