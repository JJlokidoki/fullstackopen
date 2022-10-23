import {
  Heading,
  UnorderedList,
  ListItem
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'


const UserBlogs = () => {
  const id = useParams().id
  const blogs = useSelector(store => store.blogs.filter( b => b.user.id === id ))

  if (!blogs.length) {
    return
  }

  return(
    <div>
      <Heading>{blogs[0].user.name}</Heading>
      <UnorderedList>
        {blogs.map(blog => <ListItem key={blog.id}> {blog.title} </ListItem>)}
      </UnorderedList>
    </div>
  )
}

export default UserBlogs