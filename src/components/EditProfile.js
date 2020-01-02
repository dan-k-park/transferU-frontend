import React, { Component } from 'react';
import { Form, Container, Segment } from 'semantic-ui-react';

const API_ROOT = 'http://localhost:3001'

class EditProfile extends Component {

  constructor() {
    super();
    this.state = {
      name: null,
      age: null,
      bio: null,
      avatarURL: null
    }
  }

  componentDidMount() {
    const { name, age, bio, avatarURL } = this.props.profile
    this.setState({
      name: name,
      age: age,
      bio: bio,
      avatarURL: avatarURL,
    })
  }

  handleName = evt => this.setState({ name: evt.target.value });
  handleAge = evt => this.setState({ age: evt.target.value });
  handleBio = evt => this.setState({ bio: evt.target.value });
  handleAvatarURL = evt => this.setState({ avatarURL: evt.target.value });

  handleSubmit = evt => {
    evt.preventDefault();

    fetch(API_ROOT + `/profiles/${this.props.profile.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: this.state.name,
        age: this.state.age,
        bio: this.state.bio,
        avatarURL: this.state.avatarURL,
      })
    })
    .then(() => {
      this.props.history.push(`/`)
    })
  }

  render() {

    return (
      <Container>
        <Segment raised>
          <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
          <Form.Input label='Name' placeholder={this.state.name} onChange={this.handleName} />
            <Form.Input label='Age' type='number' placeholder={this.state.age} onChange={this.handleAge} />
            <Form.Input label='Profile Picture' placeholder={this.state.avatarURL} onChange={this.handleAvatarURL} />
          </Form.Group>
          <Form.TextArea 
            label='Bio' 
            placeholder={this.state.bio}
            onChange={this.handleBio}
          />
          <Form.Button>Submit</Form.Button>
        </Form>
        </Segment>
      </Container>
    );
  }
}

export default EditProfile