import { useEffect, useState } from 'react';
import './App.css';
import { client } from './utils/client';

function App() {
  const [counters, setCounters] = useState();
  const [counterName, setCounterName] = useState('');
  const [counterValue, setCounterValue] = useState('');

  const getCounters = () => {
    client.get('counters').then(setCounters);
  };

  useEffect(getCounters, []);

  const mapCounters = () => {
    const mappedCounters = [];
    for (let name in counters) {
      mappedCounters.push({ name, value: counters[name] });
    }
    return mappedCounters;
  };

  const handleSubmit = e => {
    e.preventDefault();
    client.get(`counters/${counterName}`).then(getCounters);
  };

  const handleClick = async (type, name) => {
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const action = {
      '+': 'increment',
      '-': 'decrement',
    };

    await client.post(`counters/${name}/${action[type]}`, opts);

    getCounters();
  };

  const handleReset = name => {
    const opts = {
      method: 'DELETE',
    };

    client.delete(`counters/${name}`, opts).then(getCounters);
  };

  const handleSet = (e, name) => {
    e.preventDefault();

    client
      .put(`counters/${name}?value=${counterValue}`, {
        method: 'PUT',
      })
      .then(getCounters);
  };

  return (
    <div className="App">
      <h1>counter app</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          value={counterName}
          onChange={e => setCounterName(e.target.value)}
        />
        <button>Add counter</button>
      </form>
      <div style={{ width: 'fit-content', margin: '0 auto' }}>
        {mapCounters().map(c => (
          <div
            key={c.name}
            style={{ display: 'flex', gap: 10, marginBottom: 10 }}
          >
            <form onSubmit={e => handleSet(e, c.name)}>
              <input
                type="text"
                required
                value={counterValue}
                onChange={e => setCounterValue(e.target.value)}
              />
              <button>Set Counter</button>
            </form>
            <button onClick={() => handleClick('-', c.name)}>Decrement</button>
            <p>
              {c.name} {c.value}
            </p>
            <button onClick={() => handleClick('+', c.name)}>Increment</button>
            <button onClick={() => handleReset(c.name)}>Reset</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
