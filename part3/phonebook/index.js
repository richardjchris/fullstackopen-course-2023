const express = require("express")
const morgan = require("morgan")
const app = express()

app.use(express.json())
morgan.token("json", function getJson(req) {
   return JSON.stringify(req.body)
})

app.use(
   morgan(`tiny`, {
      skip: function (request, response) {
         return request.method === "POST"
      },
   })
)

app.use(
   morgan(`:method :url :status :res[content-length] - :response-time ms' :json`, {
      skip: function (request, response) {
         return request.method !== "POST"
      },
   })
)

let persons = [
   {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456",
   },
   {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523",
   },
   {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345",
   },
   {
      id: 4,
      name: "Mary Poppendieck",
      number: "39-23-6423122",
   },
]

// app.use(morgan(":json :method :url :response-time"))

app.post("/", function (req, res) {
   res.send("hello, world!")
})

app.get("/api/persons", (request, response) => {
   response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
   const id = Number(request.params.id)
   const person = persons.find((p) => p.id === id)

   if (person) {
      response.json(person)
   } else {
      response.status(404).send({
         error: "Person does not exist in the server.",
      })
   }
})

app.get("/api/info", (request, response) => {
   const timestamp = new Date().toString()
   const info = `<p> Phonebook has info for ${persons.length} people</p>
                <p>${timestamp}</p>
                `
   response.send(info)
})

const generateId = (maxRange) => {
   const id = Math.floor(Math.random() * maxRange)
   return id
}

app.post("/api/persons", (request, response) => {
   const id = generateId(1000000)
   const body = request.body
   const isExist = persons.find((p) => p.name === body.name)

   if (!body.name || !body.number) {
      response.status(404).send({
         error: "Missing name or phone number.",
      })
   } else if (isExist) {
      response.status(404).send({
         error: "Person is already added to the phonebook.",
      })
   }
   const person = {
      name: request.body.name,
      number: request.body.number,
      id: id,
   }

   persons.concat(person)
   response.json(person)
})

app.delete("/api/persons/:id", (request, response) => {
   const id = Number(request.params.id)
   persons = persons.filter((p) => p.id !== id)

   if (persons) {
      response.status(204).end()
   } else {
      response.status(404).send({
         error: "The person you are trying to delete does not exist in the server.",
      })
   }
})

let PORT = 3001
app.listen(PORT)
