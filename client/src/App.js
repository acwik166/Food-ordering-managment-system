import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import PrivateRoute from './routes/PrivateRoute';
import Header from './components/Header';
import Restaurants from './routes/Restaurants';
import Home from './routes/Home';
import Login from './routes/Login';
import Logout from './routes/Logout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <PrivateRoute path="/restaurants" component={Restaurants} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
