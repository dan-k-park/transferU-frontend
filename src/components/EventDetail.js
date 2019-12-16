import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class EventDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      event: {},
      attending: false,
    }
    this.eventId = this.props.match.params.id
  }
  
  componentDidMount() {
    this.setState({event: this.props.events.filter(event => event.id == this.props.match.params.id)[0]})
  }

  handleClick = () => {
    this.props.handleEventAttending(this.state.event)
  }


  render() {
    const { name, date, description, location } = this.state.event

    return (      
      <div className="ui two column centered grid">
        <div className="column">
          <div className="ui raised center aligned segment">
            <h1>{name} | {date}</h1>
            <h2>{location}</h2>
            <p>
              {description}
              <br></br>
              <Button onClick={this.handleClick}>
                {this.state.attending === true ? 'Cancel' : 'Attend' }
              </Button>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default EventDetail;