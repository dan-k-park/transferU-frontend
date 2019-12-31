import React from 'react';
import { Link, withRouter } from "react-router-dom";

import { Menu, Dropdown } from 'semantic-ui-react'


const Navbar = props => {

  const filterAcademic = () => {
    props.filterEvents('Academic')
  }

  const filterAthletic = () => {
    props.filterEvents('Athletic')
  }

  const filterOutdoor = () => {
    props.filterEvents('Outdoor')
  }

  const filterSocial = () => {
    props.filterEvents('Social')
  }

  const filterOther = () => {
    props.filterEvents('Other')
  }

  const unFilter = () => {
    props.filterEvents('All')
  }

  const currentUser = props.currentUser;
  const loggedIn = !!currentUser;

  return (
    <Menu secondary inverted size='massive' color='teal'>
      <Menu.Item as={Link} to='/events' onClick={unFilter}>
        <h2 className='WhiteText'>TransferU</h2>
      </Menu.Item>

      {loggedIn ? (
        <Menu.Item position={'right'}>
          <Dropdown text='Filter'>
            <Dropdown.Menu direction={'left'} >
              <Dropdown.Item text='Academic' onClick={filterAcademic}/>
              <Dropdown.Item text='Athletic' onClick={filterAthletic}/>
              <Dropdown.Item text='Outdoor' onClick={filterOutdoor}/>
              <Dropdown.Item text='Social' onClick={filterSocial}/>
              <Dropdown.Item text='Other' onClick={filterOther}/>
            </Dropdown.Menu>
          </Dropdown>
          {/* <Dropdown text={currentUser.profile.name}> */}
          <Dropdown text={currentUser.username}>
            <Dropdown.Menu direction={'left'}>
              {/* <Dropdown.Item as={Link} to={`/profiles/${currentUser.profile.id}`} text='My Profile' /> */}
              <Dropdown.Item as={Link} to={`/profiles/${1}`} text='My Profile' />
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