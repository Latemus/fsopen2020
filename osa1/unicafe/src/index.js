import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let addFeedback = (type) => {
    switch(type) {
      case 'good': setGood(good + 1); break;
      case 'neutral': setNeutral(neutral + 1); break;
      case 'bad': setBad(bad + 1); break;
    }
  }

  return (
    <div>
      <h2>give feedback</h2>
      <FeedbackComponent addFeedback={(type) => addFeedback(type)} />
      <h2>statistics</h2>
      <StatisticsComponent good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const FeedbackComponent = ({addFeedback}) => {
  return (
    <div>
      <Button type={'good'} handleClick={(type) => addFeedback(type)} ></Button>
      <Button type={'neutral'} handleClick={(type) => addFeedback(type)} ></Button>
      <Button type={'bad'} handleClick={(type) => addFeedback(type)} ></Button>
    </div>
  )
}

const Button = ({type, handleClick}) => (
  <button onClick={() => handleClick(type)}>{type}</button>
)

const StatisticsComponent = ({good, neutral, bad}) => {
  let sum = good + neutral + bad;
  let avg = (good * 1 + bad * (-1)) / sum;
  let positivePercent = sum > 0 ? good / sum : 0;
  
  if (sum !== 0) {
    return (
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="sum" value={sum} />
          <StatisticsLine text="avg" value={avg} />
          <StatisticsLine text="positive" value={positivePercent} />
        </tbody>
      </table>
    )
  } else {
      return ( <p>No feedback given</p> )
  }
}

const StatisticsLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>)
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)