import React from 'react';
import { Link } from 'react-router-dom';
import { Container, List } from 'semantic-ui-react';


const UserEvent = ({ event }) => {
  const { name, date, id } = event

  return(
    <Container textAlign='left'>
      <List animated verticalAlign='middle'>
        <List.Item>
          <List.Content>
            <List.Header><h2><Link to={`/events/${id}`}>{name} on {date}</Link></h2></List.Header>
          </List.Content>
        </List.Item>
      </List>
      <br></br>
    </Container>
  )
}

export default UserEvent