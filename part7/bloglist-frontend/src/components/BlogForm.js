import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotificationOn } from '../reducers/notificationReducer'
import { addNewBlog } from '../reducers/blogReducer'
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Heading
} from '@chakra-ui/react'


const BlogForm = ({
  blogFormRef
}) => {

  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreation = async (event) => {
    event.preventDefault()
    try {
      dispatch(addNewBlog(title, author, url))
      setTitle('')
      setAuthor('')
      setUrl('')
      blogFormRef.current.toggleVisible()
    }
    catch (error) {
      dispatch(setNotificationOn({ msg: error.response.data.error, success: false }, 5))
    }
  }

  return(
    <div className='blogForm'>
      <form onSubmit={handleCreation}>
        <Heading size='md'>Create new</Heading>
        <FormControl>
          <FormLabel>Title: </FormLabel>
          <Input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id='title'/>
        </FormControl>
        <FormControl>
          <FormLabel>Author: </FormLabel>
          <Input
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id='author' />
        </FormControl>
        <FormControl>
          <FormLabel>URL: </FormLabel>
          <Input
            type='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id='url' />
        </FormControl>
        <Button type='submit' colorScheme='blue' size='xs'>create</Button>
      </form>
    </div>
  )
}


export default BlogForm