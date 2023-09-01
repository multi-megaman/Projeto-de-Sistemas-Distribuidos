import express from 'express';
import cors from 'cors';
import {CreateUser, Login, GetUserData} from './database'
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

app.post('/createUser', (req, res) => {
  CreateUser(req, res);

});

app.post('/login', (req, res) => {
  Login(req, res);

});

app.post('/user/infos', (req, res) => {
  GetUserData(req, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});