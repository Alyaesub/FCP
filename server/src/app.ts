import express from 'express'
import cors from 'cors'
import { dbPromise } from './database/connect';
import testRoutes from './routes/test.route'
import equipeRoutes from './routes/equipe.route'


const app = express()
app.use(cors())
app.use(express.json())


// Utilisation du router :

app.use('/api', testRoutes)
app.use('/api/equipes', equipeRoutes)




const PORT = 3000
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`)
})
//verif de connection mySQL
console.log(dbPromise);