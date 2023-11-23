import React from 'react'

const formatDate = (dateString) => {
    const options = {year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString("en-US", options)
}

const PostDate = ({ date }) => {
  return (
    <>{formatDate(date)}</>
  )
}

export default PostDate