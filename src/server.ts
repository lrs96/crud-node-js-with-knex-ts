import express from 'express';
import routes from './routes';
require('dotenv').config()
const app = express();

app.use(express.json())
app.use(routes)

app.listen( process.env.PORT_SERVER, () => console.log(`Servidor rodando na porta porta ${process.env.PORT_SERVER}`));