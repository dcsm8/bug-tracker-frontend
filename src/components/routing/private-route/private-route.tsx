import { ComponentClass } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../../../utils/local-storage';

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
