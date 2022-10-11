import { useState, forwardRef, useImperativeHandle } from 'react'

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
        <button onClick={toggleVisible}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisible}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'


export default Togglable