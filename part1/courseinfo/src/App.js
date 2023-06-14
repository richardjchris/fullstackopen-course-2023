const App = () => {
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
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Header = (props) => (
  <h1>{props.course.name}</h1>
)

const Content = (props) => {
  const course_content = props.course.parts

  const Part = (props) => (
    <p>
      {props.part} {props.exercises}
    </p>
  )

  return (
    <div>
      <Part part={course_content[0].name} exercises={course_content[0].exercises} />
      <Part part={course_content[1].name} exercises={course_content[1].exercises} />
      <Part part={course_content[2].name} exercises={course_content[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  let total_exercises = 0

  props.course.parts.forEach(value => {
    total_exercises += value.exercises
  })

  return (
    <p>Number of exercises {total_exercises}</p>
  )
}

export default App