import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello FC Provence ! 👋⚽')
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`)
})