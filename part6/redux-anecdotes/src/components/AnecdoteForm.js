import { createNewAnecdote } from "../reducers/anecdoteReducer"
import { connect } from 'react-redux'
import { setNotificationOn } from "../reducers/notificationReducer"


const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    createNewAnecdote({
      content,
      votes: 0
    })
    props.setNotificationOn('note created', 10)
    event.target.content.value = ''
  }
  
  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='content' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    // setNotificationOn: (m, t) => dispatch(setNotificationOn(m, t)),
    setNotificationOn: (m, t) => dispatch(setNotificationOn(m, t)),
    createNewAnecdote: (d) => dispatch(createNewAnecdote(d))
  }
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm