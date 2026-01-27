import express from 'express'
import cors from 'cors'
import { dbPromise } from './database/connect';
import testRoutes from './routes/test.route'
import equipeRoutes from './routes/equipe.route'
import joueurRoutes from './routes/joueur.route'
import matchRoutes from './routes/match.route'
import evenementRoutes from './routes/evenement.route'
import actualiteRoutes from './routes/actualite.route'
import galerieRoutes from './routes/galerie.route'
import photoRoutes from './routes/photo.route'


const app = express()
app.use(cors())
app.use(express.json())


// Utilisation du router :

app.use('/api', testRoutes)
app.use('/api/equipes', equipeRoutes)
app.use('/api/joueurs', joueurRoutes)
app.use('/api/matches', matchRoutes)
app.use('/api/evenements', evenementRoutes)
app.use('/api/actualites', actualiteRoutes)
app.use('/api/galeries', galerieRoutes)
app.use('/api/photos', photoRoutes)




const PORT = 3000
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`)
})
//verif de connection mySQL
console.log(dbPromise);