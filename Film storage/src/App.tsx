// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin';//!не нужен
import Navbar from './components/Navbar';
import AdminPanel from './components/AdminPanel';
import { AuthProvider } from './components/AuthContext';
import './App.css';
import NotFound from './components/NotFound';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/admin" component={Admin} />//!устарело
          <Route path="/admin-panel" component={AdminPanel} />
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
