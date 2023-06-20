const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const total = parts.reduce((sum, parts) => {
    return sum + parts.exercises
  }, 0)

  return <strong>total of exercises {total}</strong>
}

const Part = ({ parts }) => (
  <>
    {parts.name} {parts.exercises}
  </>
)

const Content = ({ parts }) => {
  return parts.map((part) => (
    <p key={part.id}>
      <Part parts={part} />
    </p>
  ))
}

const Course = ({ course }) => {
  return course.map((course) => (
    <div key={course.id}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  ))
}
export default Course
