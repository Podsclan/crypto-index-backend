import express from 'express';
import { router } from './routes';
import winston from 'winston';
import expressWinston from 'express-winston';
import { FILE_INITIAL_VALUE } from './config/constants';
import * as fs from 'fs';

const app = express();

app.use(express.json());

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