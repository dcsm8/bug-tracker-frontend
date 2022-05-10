import { Spinner } from '@chakra-ui/react';
import PrivateRoute from '@components/routing/private-route/private-route';
import PublicRoute from '@components/routing/public-route/public-route';
import { SidebarWithHeader } from '@components/sidebar-with-header/sidebar-with-header';
import Home from '@views/dashboard/home-page/home-page';
import User from '@views/dashboard/user';
import LoginPage from '@views/login/login-page/login-page';
import NotFound from '@views/no-found/no-found';
import { Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

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
              <PrivateRoute path='*' component={NotFound} />
            </Switch>
          </SidebarWithHeader>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
