import express from 'express'
import dentistRouter from './components/dentist/router'

const PORT = 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/dentist', dentistRouter)

app.get("/", (_, res) => [
  res.send("Hello, World!")
])

app.listen(PORT, () => {
  console.log('Server is running on port 5000')
})