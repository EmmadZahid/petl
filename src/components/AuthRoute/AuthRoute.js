import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { routeTypes } from "../../constants";
import AuthService from "services/auth-service";
const _AuthRoute = props => {
  const { type, isAuthenticated, allowedForRoles } = props;

  if (type === routeTypes.PUBLIC && isAuthenticated) {
    return <Redirect to="/admin/dashboard" />;
  } else if (type === routeTypes.PRIVATE && !isAuthenticated) {
    return <Redirect to="/auth/login" />;
  } else {
    const isRouteAllowed = !allowedForRoles || !props.loggedInMember
      ? true
      : AuthService.memberHasRole(props.loggedInMember, allowedForRoles);
    if (isRouteAllowed) {
      const { component: Component, ...restOfProps } = props;
      return (
        <Route {...restOfProps}>
          <Component {...restOfProps} />
        </Route>
      );
    } else {
      return <Redirect to="/admin/dashboard" />;
    }
  }
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loggedInMember: state.auth.user
    // newPasswordRequired: state.auth.newPasswordRequired
  };
};

export const AuthRoute = connect(mapStateToProps, null)(_AuthRoute);
