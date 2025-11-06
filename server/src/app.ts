import express from 'express'
import cors from 'cors'
import testRoutes from './routes/test.route'

const app = express()

app.use(cors())
app.use(express.json())


// Utilisation du router
app.use('/api', testRoutes)




const PORT = 3000
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`)
})