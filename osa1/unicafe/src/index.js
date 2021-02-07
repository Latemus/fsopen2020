import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setters = {'setGood': setGood, 'setNeutral': setNeutral, 'setBad': setBad}
  const getters = {'getGood': good, 'setNeutral': neutral, 'setBad': bad}

  let addReview = (type) => {
    switch(type) {
      case 'good': setGood(good + 1); break;
      case 'neutral': setNeutral(neutral + 1); break;
      case 'bad': setBad(bad + 1); break;
    }
  }

  return (
    <div>
      <FeedbackComponent addFeedback={(type) => addReview(type)} />
      <StatisticsComponent good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const FeedbackComponent = ({addFeedback}) => {
  return (
    <div>
      <h2>give feedback</h2>
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
  
  return (
    <div>
      <h2>statistics</h2>
      <ul>
        <li>good {good}</li>
        <li>neutral {neutral}</li>
        <li>bad {bad}</li>
        <li>sum {sum}</li>
        <li>average {avg}</li>
        <li>positive {positivePercent}</li>
      </ul>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)