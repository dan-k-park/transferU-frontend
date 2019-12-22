import React, { Component } from 'react';
import Geocode from "react-geocode";
import { Container } from 'semantic-ui-react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

<<<<<<< HEAD
Geocode.setApiKey('AIzaSyDYdkyg10xcm8DcNGIrE1rUWy8ET1SROzA');
=======
const GOOGLE_MAPS_API_KEY = 'dingdongdoodilydoodoodilydoodilydoo'

Geocode.setApiKey(GOOGLE_MAPS_API_KEY);
>>>>>>> cb9e3904d4b7bbbf823cfc5a0aba7b21e3ad2771
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
    Geocode.fromLatLng(lat, lng).then(
      response => {
        const address = response.results[0].formatted_address;
        alert(address);
      }
    );
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
<<<<<<< HEAD
  apiKey: 'AIzaSyDYdkyg10xcm8DcNGIrE1rUWy8ET1SROzA'
=======
  apiKey: GOOGLE_MAPS_API_KEY
>>>>>>> cb9e3904d4b7bbbf823cfc5a0aba7b21e3ad2771
})(EventCreationMap);