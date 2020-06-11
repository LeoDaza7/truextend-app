import React from 'react'
import Pagination from '@material-ui/lab/Pagination'
import PaginationItem from '@material-ui/lab/PaginationItem'
import { Link } from 'react-router-dom'

export default function AppPagination(props) {
  const pagesCount = props.pagination.last ? Number(props.pagination.last.page) : Number(props.pagination.prev.page) + 1
  const currentPage = props.pagination.next ? Number(props.pagination.next.page) - 1 : Number(props.pagination.prev.page) + 1
  return (
    <Pagination 
      count={ pagesCount }
      onChange={ props.changeHandler }
      page={ currentPage }
      renderItem={(item)=>(
        <PaginationItem 
          component={Link}
          to={`/repos/user=${ props.username }/page=${item.page}`}
          {...item}
        />
      )}
    />
  )
}
