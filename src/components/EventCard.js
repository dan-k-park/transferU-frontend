import React, { Component } from 'react';
import EventAttendee from './EventAttendee'
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Popup } from 'semantic-ui-react';

import academic from './imgs/academic.jpg';
import athletic from './imgs/athletic.jpg';
import outdoor from './imgs/outdoor.jpg';
import social from './imgs/social.jpg';
import other from './imgs/other.jpg'


const imgs = [
  {
    'name': 'Academic',
    'url': academic,
  },
  {
    'name': 'Athletic',
    'url': athletic,
  },
  {
    'name': 'Outdoor',
    'url': outdoor,
  },
  {
    'name': 'Social',
    'url': social,
  },
  {
    'name': 'Other',
    'url': other,
  }
]

class EventCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      event: {},
      attendees: [],
      imgUrl: '',
      shortDesc: '',
      eventLoaded: false,
    }
  }

  componentDidMount() {
    const imgUrl = imgs.find(img => img.name === this.props.event.category.name).url
    
    const shortDesc = this.props.event.description.slice(0, this.props.event.description.length * 0.7) + '...';

    const attendees = this.props.event.profiles.map(profile => {
      return profile
    })

    this.setState({
      event: this.props.event,
      attendees: attendees,
      imgUrl: imgUrl,
      shortDesc: shortDesc,
      eventLoaded:true,
    })
  }

  render() {

    return (
      <>
        {this.state.eventLoaded ?
          <Card centered>
            <Image src={ this.state.imgUrl } />
            <Card.Content header={this.state.event.name} />
            <Card.Content textAlign='left'>
              {this.state.shortDesc}
              <br></br>
              <Link to={`events/${this.state.event.id}`}>More Info</Link>
            </Card.Content>
            <Card.Content extra>
              <Popup  
                trigger={<Icon name='user' />}
                content={this.state.attendees.map(profile => <EventAttendee profile={profile} key={profile.id} />)}
                on='click'
                position='bottom center'
              />
              {this.state.event.attendees} Attending
            </Card.Content>
          </Card>
        : null
      }
      </>
    )
  }
}

export default EventCard;