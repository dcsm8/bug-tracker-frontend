import { ComponentClass } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../../../utils/isLogin';

type PublicRouteProps = { component: ComponentClass; restricted: boolean };

const PublicRoute = ({
  component: Component,
  restricted = false,
  ...rest
}: PublicRouteProps) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? (
          <Redirect to='/dashboard' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
