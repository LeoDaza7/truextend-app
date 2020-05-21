import React, { lazy } from 'react'

const UserCard = lazy(()=>import('./user-card'))

export default function UserList(props) {
  const users = props.users.map(user => (
    <UserCard login={user.login} avatarUrl={user.avatar_url} type={user.type} />
  ))
  return (
    <>
      <h2>Users Page</h2>
      { users }
    </>
  )
}
