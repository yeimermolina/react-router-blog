import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';

import PostsIndex from './components/posts_index';
import NewPost from './components/post_new';
import PostsShow from './components/posts_show';
import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(...reducers, ReduxPromise),
));

ReactDOM.render(
  <Provider store={store}>
    
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={NewPost} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
    
  </Provider>
  , document.querySelector('.container'));
