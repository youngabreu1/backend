import express, {Request, Response} from 'express';

const PORT = 3332;

import { Aluno } from './entities/Alunos';

const app = express();

import { createConnection } from 'typeorm';

createConnection()
  .then(() => {
    console.log('Conexão estabelecida com o banco de dados');
    // Faça outras operações com o banco de dados aqui
    
    console.log(Aluno);
  })
  .catch((error) => console.log('Erro ao conectar-se ao banco de dados:', error));
  
 app.get('/',(req: Request, res: Response)=> {
    res.json({
        msg: 'ok'
    })
});

 app.listen(PORT, () => console.log('Servidor iniciado na porta '+PORT));