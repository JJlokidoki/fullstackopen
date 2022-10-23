import { logout } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button
} from '@chakra-ui/react'


const Header = ({ username }) => {
  const dispatch = useDispatch()

  // const padding = {
  //   paddingRight: 5
  // }

  const handleLogoutClick = () => {
    dispatch(logout())
  }

  // const headderStyle = {
  //   background: '#A0A0A0'
  // }

  return(
    <div className='header'>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to='/'>
            Blogs
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to='/users'>
            Users
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {/* <Link to='/' style={padding}>blogs</Link>
      <Link to='/users' style={padding}>users</Link> */}
      {username} logged in
      <Button onClick={handleLogoutClick} colorScheme='blue' size='xs'>logout</Button>
    </div>
  )
}

export default Header