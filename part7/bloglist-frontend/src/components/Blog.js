// import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationOn } from '../reducers/notificationReducer'
import { useParams } from 'react-router'
import { addNewComment, likeBlog } from '../reducers/blogReducer'
import { useState } from 'react'
import { FormControl,
  Heading,
  Button,
  Input,
  FormLabel,
  UnorderedList,
  ListItem,
  Box,
  Text } from '@chakra-ui/react'


const Blog = () => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(store => store.blogs.find(b => b.id === id))

  if (!blog) {
    return
  }

  const handleLikeClick = () => {
    try {
      dispatch(likeBlog(blog))
    }
    catch (error) {
      dispatch(setNotificationOn({ msg: error.response.data.error, success: false }, 5))
    }
  }

  // const handleDeleteClick = (blog) => async () => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
  //     try {
  //       dispatch(deleteBlog(blog))
  //     }
  //     catch (error) {
  //       dispatch(setNotificationOn({ msg: error.response.data.error, success: false }, 5))
  //     }
  //   }
  // }

  // const toggleVisible = () => {
  //   setVisible(!visible)
  // }

  const onSubmitComment = (event) => {
    event.preventDefault()
    dispatch(addNewComment(id, comment))
    setComment('')
  }

  let commentsCount = 0

  return(
    <div className='blog'>
      <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <div className='title'>
          <Text>{blog.title} {blog.author}</Text>
        </div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div className='likes'>
          {blog.likes} likes
          <Button onClick={handleLikeClick} colorScheme='blue' size='xs'>like</Button>
        </div>
        <div className='author'>
          <Text>added by {blog.user.name}</Text>
        </div>
      </Box>
      {/* comments */}
      <div className='comments'>
        <Heading size='md'>comments</Heading>
        <form onSubmit={onSubmitComment}>
          <FormControl>
            <FormLabel>Type new comment</FormLabel>
            <Input id='comment' value={comment} onChange={ (e) => setComment(e.target.value) } />
          </FormControl>
          <Button type='submit' colorScheme='blue' size='xs' >add comment</Button>
        </form>
        <UnorderedList>
          {blog.comments.map(c => {
            commentsCount += 1
            return(<ListItem key={commentsCount}>{c}</ListItem>)
          })}
        </UnorderedList>
        {/* <ul>
          {blog.comments.map(c => {
            commentsCount += 1
            return(<li key={commentsCount}>{c}</li>)
          })}
        </ul> */}
      </div>
    </div>
  )
}

export default Blog