import React, { Component } from 'react';

class UserProfile extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      userEvents: [],
    }
  }

  componentDidMount() {
    console.log(this.props)
  }

  getUser = () => {
    let userId = this.props.match.params.id
    let output = {name: 'N/A', age: 0, bio: 'N/A', imgUrl: 'N/A'}
    this.props.users.forEach(user => {
      if (user.id == userId) {
        output = user
      }
    })
    return output
  }



  getUserEvents() {
    console.log('aaahhhh')
  }

  render() {
    
    return (
      <div>

      </div>
    )
  }
}

export default UserProfile;