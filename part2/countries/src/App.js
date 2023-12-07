import { useState, useEffect } from "react"
import axios from "axios"

function App() {
   const [countryFilter, setCountryFilter] = useState("")
   const [countryList, setCountryList] = useState([])
   const [filteredList, setFilteredList] = useState([])
   const [matchFound, setMatchFound] = useState(0)
   const [countryDetails, setCountryDetails] = useState({})
   const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"

   const handleCountryChange = (event) => {
      setCountryFilter(event.target.value)
   }

   useEffect(() => {
      if (countryList.length && countryFilter.length) {
         const isMatch = countryList.filter((country) =>
            country.toLowerCase().includes(countryFilter.toLowerCase())
         )
         if (isMatch.length > 10) {
            const error = ["Too many matches, specify another filter"]
            setFilteredList(error)
            setMatchFound(false)
            setCountryDetails({})
         } else if (isMatch.length == 1) {
            setMatchFound(true)
            axios.get(`${baseUrl}/name/${isMatch[0].toLowerCase()}`).then((response) => {
               const newDetail = {
                  name: response.data.name.common,
                  capital: response.data.capital[0],
                  area: response.data.area,
                  languages: response.data.languages,
                  flag: response.data.flags.png,
               }
               console.log(newDetail)
               setCountryDetails(newDetail)
            })
         } else {
            setMatchFound(false)
            setFilteredList(isMatch)
            setCountryDetails({})
         }
         //axios.get(`${baseUrl}/${newCountry}`).then((countries) => {})
      } else {
         axios.get(`${baseUrl}/all`).then((countries) => {
            const newCountryList = []
            countries.data.map((c) => {
               newCountryList.push(c.name.common)
            })
            setCountryList(newCountryList)
         })
      }
   }, [countryFilter])

   return (
      <div>
         <CountryForm country={countryFilter} handleCountryChange={handleCountryChange} />
         <CountryList filteredList={filteredList} matchFound={matchFound} />
         <CountryDetails countryDetails={countryDetails} matchFound={matchFound} />
      </div>
   )
}

const CountryForm = ({ country, handleCountryChange }) => (
   <form>
      <div>
         find countries <input value={country} onChange={handleCountryChange} />
      </div>
   </form>
)

const CountryList = ({ filteredList, matchFound }) => {
   if (matchFound) return
   else if (filteredList.length <= 1 && !matchFound) return filteredList[0]

   return (
      <div>
         {filteredList.map((f) => (
            <p key={f}>{f}</p>
         ))}
      </div>
   )
}

const CountryDetails = ({ countryDetails, matchFound }) => {
   if (!matchFound) return null
   else if (matchFound && Object.keys(countryDetails).length)
      return (
         <div>
            <h1>{countryDetails.name}</h1>
            <p>capital {countryDetails.capital}</p>
            <p>area {countryDetails.area}</p>
            <br />
            <p>languages:</p>
            <ul>
               {Object.values(countryDetails.languages).map((l) => (
                  <li key={l}>{l}</li>
               ))}
            </ul>
            <img src={countryDetails.flag} />
         </div>
      )
   else return null
}
export default App
