const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(cors());

//
//

const counters = {
  counter: 0,
};

app.get('/counters', (req, res) => {
  res.status(200).json(counters);
});

app.put('/counters/:name', (req, res) => {
  const value = Number(req.query.value);
  const counterName = req.params.name;
  counters[counterName] = value;
  res.status(201).json({ counter: counters[counterName] });
});

app.get('/counters/:name', (req, res) => {
  const counterName = req.params.name;
  if (!counters[counterName]) counters[counterName] = 0;

  res.status(200).json({ [counterName]: counters[counterName] });
});

app.post('/counters/:name/increment', (req, res) => {
  const counterName = req.params.name;
  counters[counterName]++;
  res.status(201).json({ counter: counters[counterName] });
});

app.post('/counters/:name/decrement', (req, res) => {
  const counterName = req.params.name;
  counters[counterName]--;
  res.status(201).json({ counter: counters[counterName] });
});

app.post('/counters/:name/double', (req, res) => {
  const counterName = req.params.name;
  counters[counterName] *= 2;
  res.status(201).json({ counter: counters[counterName] });
});

app.delete('/counters/:name', (req, res) => {
  const counterName = req.params.name;
  counters[counterName] = 0;
  res.status(200).json({ counter: counters[counterName] });
});

//
//

const port = 3030;
app.listen(port, () => console.log(`server started on ${port}`));
