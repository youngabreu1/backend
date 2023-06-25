import express, { Request, Response } from 'express';
import { createConnection, getConnection } from 'typeorm';
import { Aluno } from './entities/Alunos';

const app = express();
const PORT = 3332;

app.use(express.json());

createConnection()
  .then(() => {
    console.log('Conexão estabelecida com o banco de dados');
  })
  .catch((error) => console.log('Erro ao conectar-se ao banco de dados:', error));

app.post('/alunos', async (req: Request, res: Response) => {
  try {
    const { cpf, name, dataNascimento, endereco } = req.body;

    const aluno = new Aluno();
    aluno.cpf = cpf; // Adiciona o campo "cpf"
    aluno.name = name;
    aluno.dataNascimento = dataNascimento;
    aluno.endereco = endereco;

    const alunoRepository = getConnection().getRepository(Aluno);
    await alunoRepository.save(aluno);

    res.json({
      message: 'Aluno criado com sucesso',
      aluno,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar aluno' });
  }
});
app.get('/alunos', async (req: Request, res: Response) => {
  try {
    const alunoRepository = getConnection().getRepository(Aluno);
    const alunos = await alunoRepository.find();

    res.json({
      alunos,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
});

app.put('/alunos/:cpf', async (req: Request, res: Response) => {
  try {
    const { cpf } = req.params;
    const { name, dataNascimento, endereco } = req.body;

    const alunoRepository = getConnection().getRepository(Aluno);
    const aluno = await alunoRepository.findOne({ where: { cpf: Number(cpf) } });

    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    aluno.name = name || aluno.name;
    aluno.dataNascimento = dataNascimento || aluno.dataNascimento;
    aluno.endereco = endereco || aluno.endereco;

    await alunoRepository.save(aluno);

    res.json({
      message: 'Aluno atualizado com sucesso',
      aluno,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar aluno' });
  }
});

app.delete('/alunos/:cpf', async (req: Request, res: Response) => {
  try {
    const { cpf } = req.params;

    const alunoRepository = getConnection().getRepository(Aluno);
    const aluno = await alunoRepository.findOne({ where: { cpf: Number(cpf) } });

    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    await alunoRepository.remove(aluno);

    res.json({
      message: 'Aluno removido com sucesso',
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover aluno' });
  }
});

app.listen(PORT, () => console.log('Servidor iniciado na porta ' + PORT));
