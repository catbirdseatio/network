import React from 'react'

const formatDate = (dateString) => {
    const options = {year: "numeric", month: "long", day: "numeric"}
    const dateObj = new Date(dateString)
    return `${dateObj.toLocaleDateString("en-US", options)} ${dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
}

const PostDate = ({ date }) => {
  return (
    <>{formatDate(date)}</>
  )
}

export default PostDate