import React, { lazy } from 'react'

const RepositoryCard = lazy(()=>import('./repository-card'))
const AppPagination = lazy(()=>import('./app-pagination'))

export default function RepositoryList(props) {
  const repositories = props.repos.map(repo => (
    <RepositoryCard
      key={ repo.id }
      name={ repo.name }
      description={ repo.description }
      githubPage={ repo.html_url }
      issues={ repo.has_issues ? 'Yes' : 'No' }
      openIssues={ repo.open_issues_count}
      forks= { repo.forks_count }
      />
  ))
  return (
    <>
      { repositories }
      <AppPagination />
    </>
  )
}
