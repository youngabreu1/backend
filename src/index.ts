import { DataSource } from "typeorm"

import express, {Request, Response} from 'express';

const PORT = 3332;

const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Abcdabcd",
    database: "postgres",
    entities: [
        // ....
    ],
})

const app = express();

 app.get('/',(req: Request, res: Response)=> {
    res.json({
        msg: 'ok'
    })
});

 app.listen(PORT, () => console.log('Servidor iniciado na porta '+PORT));