import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Card, Container, Icon, Image } from 'semantic-ui-react'

const imgUrl = 'https://https://picsum.photos/id/1084/200/300'

class EventCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      event: {},
      imgUrl: '',
      eventLoaded: false,
    }
  }

  componentDidMount() {
    const imgUrl = `https://picsum.photos/id/${Math.floor(Math.random() * 1084)}/200/300`
    this.setState({
      event: this.props.event,
      imgUrl: imgUrl,
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
              {this.state.event.description}
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