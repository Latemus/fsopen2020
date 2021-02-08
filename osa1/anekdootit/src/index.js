import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const getNewRandom = (itemCount) => {
    const random = Math.floor(Math.random() * itemCount)
    return (random != selected) ? random : getNewRandom(itemCount)
  }

  const getNewAnecdote = () => {
    setSelected(getNewRandom(anecdotes.length))
  }

  const getHighesVotedAnecdoteIndex = () => {
    return points.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
  }

  const voteAnecdote = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected].text}</p>
      <p>has {points[selected]} points</p>
      <Button onClick={voteAnecdote} text="vote" />
      <Button onClick={getNewAnecdote} text="new random anecdote" />
      
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[getHighesVotedAnecdoteIndex()].text}</p>
    </div>
  )
}

const Button = ({text, onClick}) => {
  return <button onClick={onClick}>{text}</button>
}

const anecdotes = [
  {
    'text': 'If it hurts, do it more often'
  },
  {
    'text': 'Adding manpower to a late software project makes it later!'
  },
  {
    'text': 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.'
  },
  {
    'text': 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.'
  },
  {
    'text': 'Premature optimization is the root of all evil.'
  },
  {
    'text': 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  }
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)