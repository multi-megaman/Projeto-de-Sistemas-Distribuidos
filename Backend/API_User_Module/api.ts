import express from 'express';
import cors from 'cors';
import {createUser} from './database'
import {updateUser} from './database'
import {deleteUser} from './database'
import {readUser} from './database'
import {readFeed} from './database'
import {addFeed} from './database'
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", //URL do frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization","x-access-token"],
}));

app.get('/', (req, res) => {
  res.send('User Module API');
});

//CRUD USER
app.post('/createUser', (req, res) => {
  createUser(req, res);
  console.log("Usuario " + req.body.name + " criado com sucesso!");
});

app.get('/user/:id', (req, res) => {
  readUser(req, res);
  console.log("Usuario " + req.body.name + " lido com sucesso!");
});

app.put('/user/:id/edit', (req, res) => {
  updateUser(req, res);
  console.log("Usuario " + req.body.name + " editado com sucesso!");
});

app.delete('/user/:id/delete', (req, res) => {
  deleteUser(req, res);
  console.log("Usuario " + req.body.name + " deletado com sucesso!");
});

//CRUD FEED
app.get('/user/:id/feed', (req, res) => {
  readFeed(req, res);
  console.log("Feed " + req.body.name + " recuperado com sucesso!");
});

app.get('/user/:id/add', (req, res) => {
  addFeed(req, res);
  console.log("Feed " + req.body.name + " recuperado com sucesso!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});