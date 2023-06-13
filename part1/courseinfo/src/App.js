const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const course_content = [
    { part: 'Fundamentals of React', exercises: 10},
    { part: 'Using props to pass data', exercises: 7},
    { part: 'State of a component', exercises: 14}
  ]

  return (
    <div>
      <Header course={course} />
      <Content course_content={course_content} />
      <Total count={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

const Header = (header) => (
  <h1>{header.course}</h1>
)

const Content = (props) => {
  const course_content = props.course_content
  return (
    <div>
      <Part part={course_content[0].part} exercises={course_content[0].exercises} />
      <Part part={course_content[1].part} exercises={course_content[1].exercises} />
      <Part part={course_content[2].part} exercises={course_content[2].exercises} />
    </div>
  )
}

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
)

const Total = (props) => (
  <p>Number of exercises {props.count}</p>
)

export default App