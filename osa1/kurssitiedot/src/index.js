import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  
  const [counter, setCounter] = useState(0)
  //setTimeout(() => setCounter(counter +1), 1000)

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 10)}>add 10</button>
      <button onClick={() => setCounter(0)}>reset</button>
    </div>
  )
}

const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => 
        <Part part={part} />
      )}
    </div>
  )
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises} 
    </p>
  )
}

const Total = ({parts}) => {
  return (
    <p>Number of exercises {
      parts.map(part => part.exercises).reduce((a,b) => a + b, 0)}
    </p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))