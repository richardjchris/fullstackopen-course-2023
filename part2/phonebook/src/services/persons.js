import axios from "axios"
const dataUrl = "http://localhost:3001/persons"

const getAll = () => {
   const request = axios.get(dataUrl)
   return request.then((response) => response.data)
}

const create = (newPerson) => {
   const request = axios.post(dataUrl, newPerson)
   return request.then((response) => response.data)
}

const update = (id, updatedPerson) => {
   const request = axios.put(`${dataUrl}/${id}`, updatedPerson)
   return request.then((response) => response.data)
}

const remove = (id) => {
   const request = axios.delete(`${dataUrl}/${id}`)
   return request.then((response) => response.status)
}

export default { getAll, create, update, remove }
