import React from 'react'

import Body from '../components/Body'
import Posts from '../components/Posts'
import { useParams } from 'react-router'


const AllPostsPage = () => {
    const { username } = useParams()
  return (
    <Body>
        <h2>{username}</h2>
        <Posts posts={[]}/>
    </Body>
  )
}

export default AllPostsPage