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
import uploadRoutes from "./routes/upload.route";


const app = express()
const PORT = 3000

//Middlewares
app.use(cors())
app.use(express.json({ limit: "50mb" }));  // ← AUGMENTE ICI
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
/* app.use(express.json()) */


// routes :
app.use('/api', testRoutes)
app.use('/api/equipes', equipeRoutes)
app.use('/api/joueurs', joueurRoutes)
app.use('/api/matches', matchRoutes)
app.use('/api/evenements', evenementRoutes)
app.use('/api/actualites', actualiteRoutes)
app.use('/api/galeries', galerieRoutes)
app.use('/api/photos', photoRoutes)
app.use("/api/upload", uploadRoutes);




//lancement serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`)
})
//verif de connection mySQL
console.log(dbPromise);