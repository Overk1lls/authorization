import {
  ActivateEmail,
  Authorization,
  Footer,
  Home,
  Login,
  NotFound,
  ResetPassword
} from './components/index';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useToken } from './hooks/useToken';
import 'bootstrap/dist/css/bootstrap.min.css';

export const baseUrl = process.env.NODE_ENV === 'production' ? '/authorization/' : '/';

function App() {
  const { token, setToken } = useToken();

  const redirectIfNoToken = Component => token ? redirectToBase() : <Component />;

  const redirectToBase = () => <Redirect to={`${baseUrl}/`} />;

  return (
    <div className="container pt-5">
      <Router>
        <Switch>
          <Route exact path={baseUrl}>
            {token ?
              <Home /> :
              <Redirect to={`${baseUrl}login`} />
            }
          </Route>
          <Route exact path={`${baseUrl}login`}>
            {token ?
              redirectToBase() :
              <Login setToken={setToken} />
            }
          </Route>
          <Route exact path={`${baseUrl}auth`}>
            {redirectIfNoToken(Authorization)}
          </Route>
          <Route path={`${baseUrl}reset-password/:code`}>
            {redirectIfNoToken(ResetPassword)}
          </Route>
          <Route path={`${baseUrl}activate-email/:code`}>
            {redirectIfNoToken(ActivateEmail)}
          </Route>
          <Route path={'*'}><NotFound /></Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;