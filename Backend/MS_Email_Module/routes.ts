import express from 'express';

import {notifyAll} from './mail';

const app = express();
const PORT = 3001;

// Use as rotas definidas em seu código
app.use('/', express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/notifyAll', notifyAll);