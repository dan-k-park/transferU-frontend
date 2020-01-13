import React, { Component } from 'react';
import Geocode from "react-geocode";
import { Container } from 'semantic-ui-react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

Geocode.setApiKey('scramblesthedeathdealer');

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
      address: '',
      position: {},
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {},
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
    this.setState({
      position: { lat, lng },
    })
    Geocode.fromLatLng(lat, lng).then(
      response => {
        const address = response.results[0].formatted_address;
        this.setState({ address: address })
      }
    );
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

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
                <Marker
                position={this.state.position}
                onClick={this.onMarkerClick}
                />
                <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
                >
                <div>
                  <h4>{this.state.address}</h4>
                </div>
              </InfoWindow>
            </Map>
          </Container>
          : null
        }
      </div>
    );
  }
  
}

export default GoogleApiWrapper({
  apiKey: 'scramblesthedeathdealer'
})(EventCreationMap);