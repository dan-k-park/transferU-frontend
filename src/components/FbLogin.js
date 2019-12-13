import React, { Component } from 'react';
import FacebookLoginBtn from 'react-facebook-login';

class FbLogin extends Component {
  state = {
    auth: false,
    name: '',
    picture: ''
  }

  responseFacebook = res => {
    if(res.status !== "unknown") {
      this.setState({
        auth: true,
        name: res.name,
        picture: res.picture.data.url,
      })
    }
  }

  render() {

    let fbData;

    this.state.auth ? 
      fbData  = (
        <div>
          {/* Render home page component here */}
          <img src={this.state.picture} alt={this.state.name} />
          <h2>Welcome {this.state.name}</h2>
        </div> ) : 
      fbData = (
      <FacebookLoginBtn
        appId="434731120527434"
        autoLoad={true}
        fields="name,picture"
        callback={this.responseFacebook}
      />
    )

    return (
      <div>
        {fbData}
      </div>
    )
  }
}

export default FbLogin;