import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import Header from './components/Header';
import Home from './routes/Home';
import Login from './auth/Login';
import Logout from './auth/Logout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
