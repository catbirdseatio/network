import React from 'react'

import Body from '../components/Body'
import Posts from '../components/Posts'


const AllPostsPage = () => {
  return (
    <Body>
        <h2>All Posts</h2>
        <Posts posts={[]}/>
    </Body>
  )
}

export default AllPostsPage