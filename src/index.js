import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';

import PostsIndex from './components/posts_index';
import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(...reducers, ReduxPromise),
));

ReactDOM.render(
  <Provider store={store}>
    
    <BrowserRouter>
      <div>
        <Route path="/" component={PostsIndex} />
      </div>
    </BrowserRouter>
    
  </Provider>
  , document.querySelector('.container'));
