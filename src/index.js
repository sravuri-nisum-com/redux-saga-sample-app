// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
// import '@babel/polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// import App from './components/App'
import App from './App';

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'
// import sagaMonitor from 'saga-monitor-example'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
// const sagaMiddleware = createSagaMiddleware()
// const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore)

// const store = createStoreWithMiddleware(timer.reducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)