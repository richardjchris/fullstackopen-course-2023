import { useState, useEffect } from "react"
import personsServices from './services/persons.js'

const App = () =>  {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
      personsServices.getAll()
        .then(response => {
          setPersons(response.data)
      })
    }, [])

  const setPerson = (event) => {
    event.preventDefault()

    const isExist = persons.filter((person) => person.name === newName).length

    const newPerson = !isExist
      ? { name: newName, number: newNumber, id: persons.length + 1 }
      : alert(`${newName} is already added to phonebook`)

    if (newPerson) {
      personsServices.create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
        })
    } else {
      return false
    }
  }

  const handleRemovePerson = (event) => {
    event.preventDefault()

    console.log("ey")
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
        <Persons
          persons={personsToShow}
          handleRemovePerson={handleRemovePerson}
        />
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

const Persons = ({ persons, handleRemovePerson}) => 
  persons.map((person) =>
    <Person
      key={person.name}
      person={person}
      handleDelete={handleRemovePerson}/>
  )

const Person = ({ person, handleDelete }) => (
  <p>
    {person.name} {person.number}
    <button type="submit" onClick={handleDelete}>
      delete
    </button>
  </p>
)

export default App
