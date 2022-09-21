import { useState } from 'react'

const Button = ({handler, text}) => {
  return(
    <button onClick={handler}> {text} </button>
  )
}

const StatisticLine  = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({all, good, bad, neutral}) => {
  if (all){
    return(
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={(good - bad) / all} />
            <StatisticLine text="positive" value={`${100 / all * good} %`} />
          </tbody>
        </table>
      </div>
    )
  }
  else{
    return(
      <p>No feedback given</p>
    )
  }
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const incrementAll = () => {
    setAll(all + 1)    
  }

  const incrementGood = () => {
    setGood(good + 1)
    incrementAll()
  }

  const incrementNeutral = () => {
    setNeutral(neutral + 1)
    incrementAll()
  }

  const incrementBad = () => {
    setBad(bad + 1)
    incrementAll()
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={incrementGood} text="good"/>
      <Button handler={incrementNeutral} text="neutral"/>
      <Button handler={incrementBad} text="bad"/>
      <h1>statistics</h1>
      <Statistics all={all} good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App