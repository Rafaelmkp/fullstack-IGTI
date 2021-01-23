import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();

const { readFile, writeFile } = fs;

//Activity 1
router.post('/new-grade', async (req, res, next) => {
  try {
    let newGrade = req.body;

    //need test
    if (
      !newGrade.student ||
      !newGrade.subject ||
      !newGrade.type ||
      !newGrade.value
    ) {
      throw new Error('Missing required parameters.');
    }
    const data = JSON.parse(await readFile(global.fileGrades));
    //Manually spreading array prevents from getting undesired body data
    newGrade.id = {
      id: data.nextId,
      student: newGrade.student,
      subject: newGrade.subject,
      type: newGrade.type,
      value: newGrade.value,
      timestamp: Date.now(),
    };
    data.grades.push(newGrade);
    data.nextId++;
    await writeFile(global.fileGrades, JSON.stringify(data, null, 2));

    res.send(newGrade);
  } catch (err) {
    next(err);
  }
});

router.put('/update-grade', async (req, res, next) => {
  try {
    let params = req.body;
    if (
      !params.id ||
      !newGrade.student ||
      !newGrade.subject ||
      !newGrade.type ||
      !newGrade.value
    ) {
      throw new Error('Missing required parameters.');
    }

    const data = JSON.parse(await readFile(global.fileGrades));
    let index = data.grades.findIndex((grade) => {
      return grade.id === params.id;
    });
    if (index === -1) {
      throw new Error('Register not found.');
    }

    data.grades[index].student = params.student;
    data.grades[index].subject = params.subject;
    data.grades[index].type = params.type;
    data.grades[index].value = params.value;

    await writeFile(global.fileGrades, JSON.stringify(data));

    res.send(data[index]);
  } catch (err) {
    next(err);
  }
});

router.delete('/delete-grade/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileGrades));
    const isIndex = data.grades.findIndex((grade) => {
      grade.id === req.params.id;
    });
    if (index === -1) {
      throw new Error('Registro não encontrado.');
    }
    const deletedGrade = data[req.params.id];
    data.grades = data.grades.filter((grade) => {
      grade.id !== index;
    });
    await writeFile(global.fileGrades, JSON.stringify(data, null, 2));

    res.send(deletedGrade);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileGrades));
    const id = req.params.id;
    const isIndex = data.grades.findIndex((grade) => {
      grade.id === id;
    });
    if (index === -1) {
      throw new Error('Registro não encontrado.');
    }

    const grade = data.grades[id];

    res.send(grade);
  } catch (err) {
    next(err);
  }
});

router.get('/final-grade/:student/:subject');

router.use((err, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
