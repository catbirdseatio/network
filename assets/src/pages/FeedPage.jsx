import React from 'react'

import Body from '../components/Body'
import Posts from '../components/Posts'


const AllPostsPage = () => {
  return (
    <Body>
        <h2>Feed</h2>
        <Posts posts={[]}/>
    </Body>
  )
}

export default AllPostsPage