import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  // Th,
  Td,
  TableContainer,
  TableCaption,
} from '@chakra-ui/react'

const Users = () => {
  const blogs = useSelector(store => store.blogs)

  let userBlogs = {}
  blogs.forEach( b => {
    if (b.user.id in userBlogs) {
      userBlogs[b.user.id].count += 1
    }
    else {
      userBlogs[b.user.id] = { name: b.user.name, count: 1 }
    }
  })

  return(
    <div>
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <TableCaption>blogs created</TableCaption>
          </Thead>
          <Tbody>
            {Object.keys(userBlogs).map( key => {
              return(
                <Tr key={key}>
                  <Td>
                    <Link to={`${key}`}> {userBlogs[key].name} </Link>
                  </Td>
                  <Td>
                    {userBlogs[key].count}
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users