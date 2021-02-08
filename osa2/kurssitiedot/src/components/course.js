import React from 'react'

const Course = ({course}) => {
    return (
      <div>
        <Header courseName={course.name} />
        <Content parts={course.parts} courseId={course.id} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
const Header = ({courseName}) => {
    return (
        <h2><strong>{courseName}</strong></h2>
    )
}

const Content = ({parts, courseId}) => {
    return (
        <div>
            {parts.map(part => <Part key={courseId + '-' + part.id} part={part} />)}
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
        <p>
        <strong>
            Total of {parts.map(part => part.exercises).reduce((a,b) => a + b, 0)} exercises
        </strong>
        </p>
    )
}

export default Course;