import React from 'react';
import Router from './navigation/Router'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';
import reducers from './redux/reducers'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

const App = () => {
  const store = createStore(reducers, {}, applyMiddleware(thunk));
  const persistor = persistStore(store);

  return (
    <ActionSheetProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    </ActionSheetProvider>
  );
};

export default App;
