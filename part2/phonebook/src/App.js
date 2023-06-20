import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  const setPerson = (event) => {
    event.preventDefault()

    const isExist = persons.filter((person) => person.name === newName).length

    const newPerson = !isExist
      ? { name: newName, number: newNumber, id: persons.length + 1 }
      : alert(`${newName} is already added to phonebook`)

    if (newPerson) {
      setPersons(persons.concat(newPerson))
    } else {
      return false
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleClick={setPerson}
      />
      {/* <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={setPerson}>
            add
          </button>
        </div>
      </form> */}
      <h2>Numbers</h2>
      <div>
        <Persons persons={personsToShow} />
      </div>
    </div>
  )
}

const Filter = ({ value, handleChange }) => (
  <div>
    filter shown with <input value={value} onChange={handleChange} />
  </div>
)

const PersonForm = ({ name, number, handleNameChange, handleNumberChange, handleClick }) => (
  <form>
    <div>
      name: <input value={name} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={number} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit" onClick={handleClick}>
        add
      </button>
    </div>
  </form>
)

const Persons = ({ persons }) =>
  persons.map((person) => <Person key={person.name} person={person} />)

const Person = ({ person }) => (
  <p>
    {person.name} {person.number}
  </p>
)

export default App
