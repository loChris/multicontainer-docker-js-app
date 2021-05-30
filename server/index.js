import keys from './keys';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Pool } from 'pg';

// Express App Setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
pgClient = new Pool({
	user: keys.pgUser,
	host: keys.pgHost,
	database: keys.pgDatabase,
	password: keys.pgPassword,
	port: keys.pgPort,
});

pgClient.on('error', () => console.log('Lost PG connection...'));

pgClient.on('connect', (client) => {
	client
		.query('CREATE TABLE IF NOT EXISTS values (number INT)')
		.catch((err) => console.error(err));
});
