import React, { Component } from 'react';
import { Form, Container, Segment } from 'semantic-ui-react';


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

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit = evt => {
    evt.preventDefault();

    fetch(URL + `/profiles/${this.props.profile.id}`, {
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
      this.props.history.push(`/profiles/${this.props.profile.id}`)
    })
  }

  render() {
    const { name, age, bio, avatarURL } = this.state;

    return (
      <Container>
        <Segment raised>
          <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input label='Name' name={name} placeholder={name} value={name} onChange={this.handleChange} />
            <Form.Input label='Age' name={age} type='number' value={age} onChange={this.handleChange} />
            <Form.Input label='Profile Picture' name={avatarURL} placeholder={avatarURL} value={avatarURL} onChange={this.handleChange} />
          </Form.Group>
          <Form.TextArea 
            label='Bio' 
            name={bio}
            placeholder={bio}
            value={bio}
            onChange={this.handleChange}
          />
          <Form.Button>Submit</Form.Button>
        </Form>
        </Segment>
      </Container>
    );
  }
}

export default EditProfile