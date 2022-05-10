import { isLogin } from '@utils/local-storage';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';

type PublicRouteProps = {
  component: React.ComponentType<RouteComponentProps>;
  path: string;
  restricted?: boolean;
  exact?: boolean;
};

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
