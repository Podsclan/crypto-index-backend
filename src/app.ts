import express from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
import fs from 'fs';
import cors from 'cors';

import { router } from './routes';
import { FILE_INITIAL_VALUE } from './config/constants';

const app = express();

app.use(express.json());
app.use(cors());

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

app.use('/api', router);
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

app.get('*', (req, res) => {
    res.status(404).json({
        message: 'Endpoint não encontrado'
    });
});

app.post('*', (req, res) => {
    res.status(404).json({
        message: 'Endpoint não encontrado'
    });
});

fs.writeFileSync('src/api/common/currencies.json', JSON.stringify(FILE_INITIAL_VALUE));

export { app };