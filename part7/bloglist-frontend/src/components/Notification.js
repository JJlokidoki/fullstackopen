import { useSelector } from 'react-redux'
import {
  Alert,
  AlertTitle,
} from '@chakra-ui/react'

const Notification = () => {
  const { msg, success } = useSelector(store => store.notification)

  if (msg === null) {
    return null
  }
  if (success) {
    return(
      <div className="success">
        <Alert status='success'>
          <AlertTitle>{msg}</AlertTitle>
        </Alert>
      </div>
    )
  }
  return (
    <div className="error">
      <Alert status='error'>
        <AlertTitle>{msg}</AlertTitle>
      </Alert>
    </div>
  )
}

export default Notification