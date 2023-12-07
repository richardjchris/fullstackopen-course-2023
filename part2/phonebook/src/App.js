import { useState, useEffect } from "react"
import personsServices from "./services/persons.js"
import "./index.css"

const App = () => {
   const [persons, setPersons] = useState([])
   const [newName, setNewName] = useState("")
   const [newNumber, setNewNumber] = useState("")
   const [filter, setFilter] = useState("")
   const [notificationMessage, setNotificationMessage] = useState("")
   const [notificationType, setNotificationType] = useState("")

   useEffect(() => {
      personsServices.getAll().then((personsList) => {
         setPersons(personsList)
      })
   }, [])

   const setPerson = (event) => {
      event.preventDefault()

      const isExist = persons.filter((person) => person.name === newName)

      const newPerson = !isExist.length
         ? { name: newName, number: newNumber }
         : { name: newName, number: newNumber, id: isExist[0].id }

      if (!isExist.length) {
         personsServices.create(newPerson).then((addedPerson) => {
            setPersons(persons.concat(addedPerson))
            setNotificationMessage(`Added ${addedPerson.name}`)
            setNotificationType("success")
            setTimeout(() => {
               setNotificationMessage(null)
            }, 5000)
         })
      } else if (
         window.confirm(
            `${newPerson.name} is already added to the phonebook, replace the old number with a new one?`
         )
      ) {
         personsServices.update(newPerson.id, newPerson).then((addedPerson) => {
            setPersons(persons.map((p) => (p.id !== addedPerson.id ? p : addedPerson)))
         })
      }

      setNewName("")
      setNewNumber("")
   }

   const handleRemovePerson = (person) => {
      if (window.confirm(`Delete ${person.name}?`))
         personsServices
            .remove(person.id)
            .then((status) => {
               if (status == 200) {
                  personsServices.getAll().then((personsList) => {
                     setPersons(personsList)
                  })
               }
            })
            .catch((e) => {
               console.log(e)
               setNotificationMessage(
                  `Information of ${person.name} has already been removed from the server.`
               )
               setNotificationType("error")
               setTimeout(() => {
                  setNotificationMessage(null)
               }, 5000)
            })
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
         <Notification message={notificationMessage} type={`notification ${notificationType}`} />
         <Filter value={filter} handleChange={handleFilterChange} />
         <h3>Add a new</h3>
         <PersonForm
            name={newName}
            number={newNumber}
            handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange}
            handleClick={setPerson}
         />
         <h2>Numbers</h2>
         <div>
            <Persons persons={personsToShow} handleRemovePerson={handleRemovePerson} />
         </div>
      </div>
   )
}

const Filter = ({ value, handleChange }) => (
   <div>
      filter shown with <input value={value} onChange={handleChange} />
   </div>
)

const Notification = ({ message, type }) => {
   if (message === null) {
      return null
   }

   return (
      <div className={type}>
         <p>{message}</p>
      </div>
   )
}

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

const Persons = ({ persons, handleRemovePerson }) =>
   persons.map((person) => (
      <Person key={person.name} person={person} handleDelete={() => handleRemovePerson(person)} />
   ))

const Person = ({ person, handleDelete }) => (
   <p>
      {person.name} {person.number}
      <button type="submit" onClick={handleDelete}>
         delete
      </button>
   </p>
)

export default App
