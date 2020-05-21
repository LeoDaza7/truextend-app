import React, { lazy } from 'react'

const UserCard = lazy(()=>import('./user-card'))
const AppPagination = lazy(()=>import('./app-pagination'))

export default function UserList(props) {
  const users = props.users.map(user => (
    <UserCard
      key={ user.id }
      login={ user.login }
      avatarUrl={ user.avatar_url }
      githubPage={ user.html_url }
      reposUrl={ user.repos_url }
    />
  ))
  return (
    <>
      { users }
      <AppPagination />
    </>
  )
}
