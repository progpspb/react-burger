
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks';
import { getUser, isAuthorized } from '../../services/selectors';
import { ProtectedRouteType } from '../../types/types';
import { ReactElement } from 'react';

const ProtectedRoute = ({ component, needAuth } : ProtectedRouteType) => {

    const isAuth = useSelector(isAuthorized);
    const user = useSelector(getUser);
    const location = useLocation();

    if(!isAuth) {
      //return null;
    }
    
    // для неавторизованного пользователя И пользователь авторизован
    if (!needAuth && user) {
      const { from } = location.state || { from: { pathname: '/' } };
      return <Navigate to={from} />;
    }
  
    // для авторизованного пользователя И пользователь не авторизован
    if (needAuth && !user) {
      return <Navigate to='/login' state={{ from: location }} />;
    }
  
    return component;
}

export const OnlyForAuthorized = ({ component } : { component: ReactElement}) => (
  <ProtectedRoute component={component} needAuth={true} />
);

export const OnlyForGuest = ({ component } : { component: ReactElement}) => (
  <ProtectedRoute component={component} needAuth={false} />
);