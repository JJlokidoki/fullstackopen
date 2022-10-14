import { useDispatch, useSelector } from 'react-redux'
import { incrementVoteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector( ({ anecdotes, filter }) => anecdotes.filter( a => a.content.toLowerCase().includes(filter) ))
  const dispatch = useDispatch()

  return(
    <div> 
      {anecdotes
        .sort( (a, b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(incrementVoteFor(anecdote))}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList