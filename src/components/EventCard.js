import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Card, List, Icon, Image } from 'semantic-ui-react'

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
    const imgUrl = `https://picsum.photos/id/${Math.floor(Math.random() * 1084)}/200/300`;
    const shortDesc = this.props.event.description.slice(0, this.props.event.description.length * 0.7) + '...';
    this.setState({
      event: this.props.event,
      imgUrl: imgUrl,
      shortDesc: shortDesc,
      eventLoaded:true,
    })
  }

  render() {
    return (
      <>
        {this.state.eventLoaded ?
          <Card>
            <Image src={ this.state.imgUrl } />
            <Card.Content header={this.state.event.name} />
            <Card.Content textAlign='left'>
              {this.state.shortDesc}
              <br></br>
              <Link to={`events/${this.state.event.id}`}>More Info</Link>
            </Card.Content>
            <Card.Content extra>
              <Icon name='user' />{this.state.event.attendees} Attending
            </Card.Content>
          </Card>
        : null
      }
      </>
    )
  }
}

export default EventCard;