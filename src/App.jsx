import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SidebarWithHeader from './views/dashboard/dashboard-page/dashboard-page';
import LoginPage from './views/login/login-page/login-page';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/app'>
            <SidebarWithHeader>
              <Switch>
                <Route exact path='/app/home'>
                  <Home />
                </Route>
                <Route exact path='/app/about'>
                  <About />
                </Route>
              </Switch>
            </SidebarWithHeader>
          </Route>
          <Route exact path='/'>
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}
