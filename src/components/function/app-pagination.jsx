import React from 'react'
import Pagination from '@material-ui/lab/Pagination'
import PaginationItem from '@material-ui/lab/PaginationItem'
import { Link } from 'react-router-dom'

export default function AppPagination(props) {
  return (
    <Pagination 
      count={ Number(props.pagination.last.page) }
      onChange={ props.changeHandler }
      page={ Number(props.pagination.next.page) - 1 }
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
