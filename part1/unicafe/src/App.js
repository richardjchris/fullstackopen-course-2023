import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const totalClicks = good + neutral + bad
  const statistics = {
    all: good-bad,
    average: 0,
    positive: '0'
  }

  if (totalClicks != 0) {
    statistics["average"] = statistics["all"]/totalClicks
    statistics["positive"] = (good/totalClicks*100) + "%"
  }

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} statistics={statistics} totalClicks={totalClicks} />
    </div>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Statistics = (props) => {
 if (props.totalClicks == 0)
    return <div><p>No feedback given</p></div>
 else {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} />
            <StatisticLine text="all" value={props.statistics["all"]} />
            <StatisticLine text="average" value={props.statistics["average"]} />
            <StatisticLine text="positive" value={props.statistics["positive"]} />
          </tbody>
        </table>
    </div>
    )
  }
}

const StatisticLine = ({text,value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

export default App