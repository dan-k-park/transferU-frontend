import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

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

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.props.history.push('/')
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
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Log-in to your account
        </Header>
        <Segment raised>
           <Form>
             <Form.Input  
              name="username"
              icon='user'
              iconPosition='left'
              placeholder="Username"
              value={fields.username}
              onChange={this.handleChange}
              />
            <Form.Input
              name="password"
              icon='lock'
              iconPosition='left'
              type="password"
              placeholder="Password"
              value={fields.password}
              onChange={this.handleChange}
              />
            {this.state.error ? <p>Invalid Username/Password</p> : null}
            <Button onClick={this.handleSubmit} color='teal'>Login</Button>
            <Button as={Link} to={`/register`} color='teal'>
              Register
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
    )
  }
}

export default Login;