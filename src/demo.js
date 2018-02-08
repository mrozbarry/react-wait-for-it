import React from 'react';
import { render } from 'react-dom';
import WaitForIt from '.';

const promise = new Promise(resolve => {
  setTimeout(resolve, 5000)
})
  .then(() => fetch('https://jsonplaceholder.typicode.com/users/error'))
  .then(res => {
    if (res.status >= 400) {
      return Promise.reject({
        message: `HTTP ${res.status}`,
        response: res,
      })
    }
    return res.json()
  });

const App = () => (
  <WaitForIt
    promise={promise}
    renderError={err => [err.message, JSON.stringify(err.response.json())].join(' ')}
  />
);

render(<App />, document.getElementById('root'));
