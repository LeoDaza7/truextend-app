import React from 'react'

export default function UserList(props) {
  const users = props.users.map(user => (
    <li key={user.id}>
      {user.login}
    </li>
  ))
  return (
    <>
      <h2>Users Page</h2>
      <ul>{ users }</ul>
    </>
  )
}
