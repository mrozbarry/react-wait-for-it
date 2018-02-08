import React from 'react';
import { render } from 'react-dom';
import WaitForIt from '.';

const promise = new Promise(resolve => {
  setTimeout(resolve, 5000)
})
  .then(() => fetch('https://jsonplaceholder.typicode.com/users'))
  .then(res => res.json());

const App = () => (
  <WaitForIt
    promise={promise}
  />
);

render(<App />, document.getElementById('root'));
