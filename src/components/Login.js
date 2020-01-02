import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

import { Button, Container, Form, Segment } from 'semantic-ui-react';

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
          {this.state.error ? <h1>Dingdongdoodilydoodoodilydoodilydoo</h1> : null}
          <Form>
            <Form.Input  
              name="username"
              placeholder="Username"
              value={fields.username}
              onChange={this.handleChange}
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="Password"
              value={fields.password}
              onChange={this.handleChange}
            />
            <Button onClick={this.handleSubmit} color='teal'>Login</Button>
            <Button as={Link} to={`/register`} color='teal'>
              Register
            </Button>
          </Form>
        </Segment>
      </Container>
    )
  }
}

export default Login;