import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const App = () => {
  return <div></div>;
};

console.log('TEST');
ReactDOM.render(<App />, document.getElementById('root'));
