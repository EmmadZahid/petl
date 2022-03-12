/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import { AuthRoute } from "../components/AuthRoute/AuthRoute";
import { authActions } from "../containers/auth/state/authActions";

import { connect, useDispatch, useSelector, shallowEqual } from "react-redux";
import AuthService from "services/auth-service";
const _Admin = props => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const loggedInMember = useSelector(({auth}) => {
    debugger
    return auth.user
  }, shallowEqual)
  const dispatch = useDispatch()
  React.useEffect(() => {
    // props.getMyProfile();
    dispatch(authActions.user.request())
  }, []);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = routes => {
    return routes.map((route, key) => {
      if (route.layout === "/admin") {
        return (
          <AuthRoute
            path={route.layout + route.path}
            component={route.component}
            key={key}
            type={route.type}
            member={loggedInMember}
            allowedForRoles={route.allowedForRoles}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getAllowedRoutesForSideBar = () =>{
    return routes.filter(route => {
      let isAllowed = route.showInSidebar
      if(route.allowedForRoles){
        isAllowed = isAllowed && AuthService.memberHasRole(loggedInMember, route.allowedForRoles)
      }
      return isAllowed
    })
  }

  const getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      {/* <div style={{opacity: 0.5, position: 'absolute', width: '100%', height: '100%'}}></div> */}
      <Sidebar
        {...props}
        routes={getAllowedRoutesForSideBar()}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/petl-blue-logo.png").default,
          imgAlt: "..."
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          user={loggedInMember}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/admin/index" />
        </Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

// const mapDispatchToProps = {
//   getMyProfile: authActions.user.request
// };

const Admin = connect(null, null)(_Admin);
export default Admin;
