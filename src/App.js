import React from 'react';
import Router from './navigation/Router'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';
import reducers from './redux/reducers'

const App = () => {
  const store = createStore(reducers, {}, applyMiddleware(thunk));
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default App;
