import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from "./reducers";
import thunk from 'redux-thunk';
import GlobalStyles from "./GlobalStyles";
import Template from "./Components/Template";

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Template />
    </Provider>
  );
}

export default App;