import express from 'express'
import cors from 'cors'
import { dbPromise } from './database/connect';
import equipeRoutes from './routes/equipe.route'
import joueurRoutes from './routes/joueur.route'
import matchRoutes from './routes/match.route'
import evenementRoutes from './routes/evenement.route'
import actualiteRoutes from './routes/actualite.route'
import galerieRoutes from './routes/galerie.route'
import photoRoutes from './routes/photo.route'
import uploadRoutes from "./routes/upload.route";
import userRoutes from "./routes/user.route"


const app = express()
const PORT = 3000

//Middlewares
app.use(cors())
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:8080',
    'https://xn--fcprovenal-v6a.fr',
	  'https://www.xn--fcprovenal-v6a.fr',
	  'http://xn--fcprovenal-v6a.fr',
	  'http://www.xn--fcprovenal-v6a.fr'
  ],
    
  credentials: true
}));
app.use(express.json({ limit: "50mb" }));  // ← AUGMENTE LA taille des fichier upload
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});


// routes :
app.use('/api/equipes', equipeRoutes)
app.use('/api/joueurs', joueurRoutes)
app.use('/api/matches', matchRoutes)
app.use('/api/evenements', evenementRoutes)
app.use('/api/actualites', actualiteRoutes)
app.use('/api/galeries', galerieRoutes)
app.use('/api/photos', photoRoutes)
app.use("/api/upload", uploadRoutes);
app.use("/api", userRoutes);




//lancement serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`)
})
//verif de connection mySQL
console.log(dbPromise);