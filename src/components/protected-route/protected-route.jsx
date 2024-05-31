
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser, isAuthorized } from '../../services/selectors.js';

const ProtectedRoute = ({ component, needAuth }) => {

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

ProtectedRoute.propTypes = {
  component: PropTypes.node.isRequired,
  needAuth: PropTypes.bool
}

export const OnlyForAuthorized = ({ component }) => (
  <ProtectedRoute component={component} needAuth={true} />
);

export const OnlyForGuest = ({ component }) => (
  <ProtectedRoute component={component} needAuth={false} />
);