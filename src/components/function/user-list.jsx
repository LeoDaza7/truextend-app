import React, { lazy } from 'react'

const UserCard = lazy(()=>import('./user-card'))

export default function UserList(props) {
  const users = props.users.map(user => (
    <UserCard
      login={ user.login }
      avatarUrl={ user.avatar_url }
      githubPage={ user.html_url }
      reposUrl={ user.repos_url }/>
  ))
  return (
    <>
      <h2>Users Page</h2>
      { users }
    </>
  )
}
