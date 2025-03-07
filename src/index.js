import init from './infraestructure/init.js';
import config from './infraestructure/config.js';
import express from 'express';

const app = express()

init(app)

app.listen(config.APP_PORT, () => console.log(`App running\n http://localhost:${config.APP_PORT}`));
