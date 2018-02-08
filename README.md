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

## Play with it

```
yarn start
```

[localhost:8080](http://localhost:8080)

## Test it

```
yarn test
```
