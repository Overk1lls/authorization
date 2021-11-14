import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Authorization from './components/authorization';
import Home from './components/home';
import Login from './components/login';
import useToken from './hooks/useToken';
import ResetPassword from './components/resetPassword';
import ActivateEmail from './components/activateEmail';
import Footer from './components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <div className="container pt-5">
        <Router>
          <Switch>
            <Route exact path='/login'>
              <Login setToken={setToken} />
            </Route>
            <Route exact path='/auth'>
              <Authorization />
            </Route>
            <Route path='/resetPassword/:resetCode'>
              <ResetPassword />
            </Route>
            <Route path='/activateEmail/:code'>
              <ActivateEmail />
            </Route>
            <Redirect to='/login' />;
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container pt-5">
    <Router>
      <Switch>
        <Route exact path='/home'>
          <Home />
        </Route>
        <Redirect to='/home' />
      </Switch>
      <Footer />
    </Router></div>
  );
}

export default App;