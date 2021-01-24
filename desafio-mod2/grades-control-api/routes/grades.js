import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();

const { readFile, writeFile } = fs;

//Activity 1
router.post('/new-grade', async (req, res, next) => {
  try {
    let newGrade = req.body;

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
    newGrade = {
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

//Activity 2
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

//Activity 3
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

//Activity 4
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

//Activity 5
router.get('/final-grade/:student/:subject', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileGrades));
    //treated string values for better comparing
    const student = req.params.student.toLowerCase();
    const subject = req.params.subject.toLowerCase();

    const aimedGrades = data.grades.filter((grade) => {
      const gradeSubject = grade.subject.toLowerCase().split(' ');
      //presumably subject will always be "00 - xxxxx"
      const gradeStudent = grade.student.toLowerCase().replace(' ', '-');
      if (gradeSubject[2] === subject && gradeStudent === student) return grade;
    });

    const totalValue = aimedGrades.reduce((acc, curr) => acc + curr.value, 0);

    const strRespond = `${student} - ${subject}: ${totalValue}`;
    res.send(strRespond);
  } catch (err) {
    next(err);
  }
});

//Activity 6
/**
 * Since its kown there is only 3 types of grades,
 * its possible to search for the first letter
 * This is for performance reasons
 * Different types may require regex for accentuated chars
 */
router.get('/avg-grade/:subject/:type', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileGrades));

    const subject = req.params.subject.toLowerCase();
    const type = req.params.type.toLowerCase().charAt(0);

    const aimedGrades = data.grades.filter((grade) => {
      const gradeSubject = grade.subject.toLowerCase().split(' ');
      if (
        gradeSubject[2].toLowerCase() === subject &&
        grade.type.toLowerCase().charAt(0) === type
      ) {
        return grade;
      }
    });

    const avgGrade =
      aimedGrades.reduce((sum, value) => {
        return sum + value;
      }, 0) / aimedGrades.length;

    res.send(avgGrade);
  } catch (err) {
    next(err);
  }
});

//Activity 7
router.get('/best-grades/:subject/:type', async (req, res, next) => {
  try {
    const subject = req.params.subject.toLowerCase();
    const type = req.params.type.toLowerCase().charAt(0);

    const data = JSON.parse(await readFile(global.fileGrades));

    const aimedGrades = data.grades.filter((grade) => {
      const gradeSubject = grade.subject.toLowerCase().split(' ');
      if (
        gradeSubject[2].toLowerCase() === subject &&
        grade.type.toLowerCase().charAt(0) === type
      ) {
        return grade;
      }
    });

    aimedGrades.sort((a, b) => {
      return b.value - a.value;
    });

    console.log(aimedGrades);
    const threeBestGrades = [aimedGrades[0], aimedGrades[1], aimedGrades[2]];
    res.send(threeBestGrades);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
