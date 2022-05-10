import { isLogin } from '@utils/local-storage';
import { ComponentClass } from 'react';
import { Route, Redirect } from 'react-router-dom';

type PrivateRouteProps = { component: ComponentClass };

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;
