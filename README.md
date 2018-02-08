# WaitForIt

A promise-ful component that waits to load something

## Get it

```
yarn add react-wait-for-it
# or
npm install --save react-wait-for-it
```

## Use it

```javascript
import WaitForIt from 'react-wait-for-it';

const MyApp = (props) => (
  <WaitForIt
    promise={fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json())}
    render={data => <Users users={data} />}
  />
)
```

## Test it

```
yarn test
```
