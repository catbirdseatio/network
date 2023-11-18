import React from 'react'
import Card from 'react-bootstrap/Card'

const UserProfileCard = ({ user }) => {
  return (
    <Card>
        <Card.Title>{user.username}</Card.Title>
        <Card.Body></Card.Body>
        <Card.Footer></Card.Footer>
    </Card>
  )
}

export default UserProfileCard