import React from 'react';
import Main  from './Main';
import SignIn from './SignIn';
import {
  Switch,
  Route,
} from "react-router-dom";





function App(){
  return (
    <div>
      <Switch>
        <Route path='/SignIn' component={SignIn}>
        </Route>
        <Route path='/' component={Main}>
        </Route>
      </Switch>
     
    </div>
  );
}
export default App;