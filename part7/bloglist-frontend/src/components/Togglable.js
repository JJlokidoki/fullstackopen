import { useState, forwardRef, useImperativeHandle } from 'react'
import {
  Button
} from '@chakra-ui/react'

const Togglable = forwardRef( (props, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  useImperativeHandle(refs, () => {
    return { toggleVisible }
  } )

  return(
    <div>
      <div style={hideWhenVisible}>
        <Button colorScheme='blue' size='xs' onClick={toggleVisible}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button colorScheme='blue' size='xs' onClick={toggleVisible}>cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'


export default Togglable