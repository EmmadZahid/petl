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
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import Amplify from "aws-amplify";
import { Provider } from 'react-redux';
import { store } from "./store";

Amplify.configure({
  aws_cognito_region: "us-east-1",
  aws_user_pools_id: "us-east-1_zNd5VpnM8",
  aws_user_pools_web_client_id: "4olekj8rcbrh1c2s30mvoo26uv"
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Redirect from="/" to="/admin/index" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
