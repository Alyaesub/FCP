import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello FC Provence ! 👋⚽')
})

app.get('/api/test', (req, res) => {
  res.send({ message : 'API fonctionnelle'})
})


const PORT = 3000
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`)
})