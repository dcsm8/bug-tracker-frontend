import { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './views/dashboard/home';
import User from './views/dashboard/user';
import LoginPage from './views/login/login-page/login-page';
import PublicRoute from './components/routing/public-route/public-route';
import PrivateRoute from './components/routing/private-route/private-route';
import { SidebarWithHeader } from './components/sidebar-with-header/sidebar-with-header';
import { Spinner } from '@chakra-ui/react';
import NoFound from './views/no-found/no-found';

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <PublicRoute path='/' restricted component={LoginPage} exact />
          <PublicRoute path='/login' restricted component={LoginPage} exact />
          <SidebarWithHeader>
            <Switch>
              <PrivateRoute path='/dashboard' component={Home} exact />
              <PrivateRoute path='/dashboard/user' component={User} exact />
              <PrivateRoute path='*' component={NoFound} />
            </Switch>
          </SidebarWithHeader>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
