import React, { Component } from 'react';
import { api } from '../services/api';

import { Container, Form, Segment } from 'semantic-ui-react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      fields: {
        username: '',
        password: '',
      }
    }
  }

  handleChange = evt => {
    const newFields = { ...this.state.fields, [evt.target.name]: evt.target.value };
    this.setState({ fields: newFields });
  }

  handleSubmit = evt => {
    evt.preventDefault();
    api.auth.login(this.state.fields).then(res => {
      if (!res.error) {
        const updatedState = { ...this.state.auth, user: res};
        this.props.handleLogin(res);
        this.props.history.push('/');
      } else {
        this.setState({ error: true })
      }
    });
  }

  render() {
    const { fields } = this.state;
    
    return(
      <Container>
        <Segment raised>
          {this.state.error ? <h1>Try again...</h1> : null}
          <Form onSubmit={this.handleSubmit}>
            <Form.Input  
              name="username"
              placeholder="username"
              value={fields.username}
              onChange={this.handleChange}
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={fields.password}
              onChange={this.handleChange}
            />
            <Form.Button>Login</Form.Button>
          </Form>
        </Segment>
      </Container>
    )
  }
}

export default Login;