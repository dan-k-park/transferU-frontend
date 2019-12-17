import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Menu, Dropdown } from 'semantic-ui-react'


class Navbar extends Component {

  render() {

    return (
      <Menu secondary inverted size='massive' color='teal'>

        <Menu.Item as={Link} to='/events'>
          TransferU
        </Menu.Item>

        <Menu.Item position={'right'}>
          <Dropdown text={this.props.currentUser ? this.props.currentUser.name : 'User'}>
            <Dropdown.Menu direction={'left'}>
              <Dropdown.Item as={Link} to='/users/1' text='My Profile' />
              <Dropdown.Item as={Link} to='/new_event' text='New Event' />
              <Dropdown.Divider />
              <Dropdown.Item>
                <h3><a href='http://ditzbitz.com/sheephole.html'>Logout</a></h3>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>

      </Menu>
    )
  }
}

export default Navbar;