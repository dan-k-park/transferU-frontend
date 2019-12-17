import React, { Component } from 'react';
import Geocode from "react-geocode";
import { Container } from 'semantic-ui-react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

Geocode.setApiKey("AIzaSyDYdkyg10xcm8DcNGIrE1rUWy8ET1SROzA");
// need to send user's school as a prop

const style = {
  width: '90%',
  height: '80%'
}

class EventCreationMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
      coordsLoaded: false,
    }
  }

  componentDidMount() {
    Geocode.fromAddress(this.props.location).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          lat: lat,
          lng: lng,
          coordsLoaded: true,
        }) 
      },
    )
  }

  onClick = (mapProps, map, clickEvent) => {
    const lat = clickEvent.latLng.lat()
    const lng = clickEvent.latLng.lng()
  }

  render() {

    return (
      <div>
        {this.state.coordsLoaded ? 
          <Container style={{width: '100%', height: '100%'}}>
            <Map
              google={this.props.google}
              zoom={17}
              style={style}
              onClick={this.onClick}
              initialCenter={{ lat: this.state.lat, lng: this.state.lng }}
            >
            </Map>
          </Container>
          : null
        }
      </div>
    );
  }
  
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDYdkyg10xcm8DcNGIrE1rUWy8ET1SROzA'
})(EventCreationMap);