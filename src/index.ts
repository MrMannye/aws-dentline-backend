import express from 'express'
import dentistRouter from './components/dentist/router'
import pacientsRouter from './components/pacients/router'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/dentist', dentistRouter)
app.use('/pacients', pacientsRouter);


app.get("/", (_, res) => [
	res.send("Hello, World!")
])

app.listen(5000, () => {
	console.log('Server is running on port 5000')
})