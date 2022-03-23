import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Authorization } from './components/authorization';
import { Home } from './components/home';
import { Login } from './components/login';
import { ResetPassword } from './components/reset-password';
import { ActivateEmail } from './components/activate-email';
import { Footer } from './components/footer';
import { NotFound } from './components/not-found';
import { useToken } from './hooks/useToken';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { token, setToken } = useToken();

  return (
    <div className="container pt-5">
      <Router>
        {token ?
          <Route path={'/home'} component={Home} /> :
          <Switch>
            <Route path={'/login'} component={() => <Login setToken={setToken} />} />
            <Route path={'/auth'} component={Authorization} />
            <Route path={'/reset-password/:resetCode'} component={ResetPassword} />
            <Route path={'/activate-email/:code'} component={ActivateEmail} />
            <Route component={NotFound} />
          </Switch>
        }
        <Footer />
      </Router>
    </div>
  );
}

export default App;