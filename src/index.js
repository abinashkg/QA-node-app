const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

const questions = [];

app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// Get All Questions
app.get('/questions', (req, res) => {
    const questionRes = questions.map(q =>({
        id: q.id,
        title: q.title,
        description: q.description,
        answers: q.answers.length,
    }));
    res.send(questionRes);
});

// Get a Question
app.get('/questions/:id', (req, res) => {
    const question = questions.filter(q => (q.id === parseInt(req.params.id)));
    if(question.length === 0) return res.status(404).send();
    res.send(question[0]);
});

// Insert a New Question
app.post('/questions', (req, res) => {
    const {title, description} =  req.body;
    const newQuestion = {
        id: questions.length + 1,
        title,
        description,
        answers: [],
    }
    questions.push(newQuestion);
    res.status(200).send();
});

// Insert a new answer to a question
app.post('/answers/:questionId', (req, res) => {
    const {answer} = req.body;
  
    const question = questions.filter(q => (q.id === parseInt(req.params.questionId)));
    if (question.length === 0) return res.status(404).send();
    question[0].answers.push({
      answer,
    });
    res.status(200).send();
  });

  app.listen(8081, () => {
      console.log('Listening on port 8081');
  });