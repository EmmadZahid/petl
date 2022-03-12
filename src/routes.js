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
import Index from "views/Index.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "./containers/auth/Login";
import Invite from "./containers/auth/Invite";
import Tables from "views/examples/Tables.js";
import Members from "./containers/admin/Members";
import BoardMembers from "containers/admin/BoardMembers";
import Icons from "views/examples/Icons.js";
import ForgotPassword from "containers/auth/ForgotPassword";
import ChangePassword from "containers/auth/ChangePassword";
import {routeTypes, userRoles} from './constants'
import MemberDetail from "containers/admin/MemberDetail";
import Security from "containers/admin/Security";
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    showInSidebar: true,
    type: routeTypes.PRIVATE,
    allowedForRoles:null //null means All
  },
  {
    path: "/icons",
    name: "Member Activities",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
    showInSidebar: true,
    type: routeTypes.PRIVATE,
    allowedForRoles:null //null means All
  },
  {
    path: "/maps",
    name: "Analytics",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
    showInSidebar: true,
    type: routeTypes.PRIVATE,
    allowedForRoles:null //null means All
  },
  {
    path: "/member-profile/:id",
    name: "Member Profile",
    icon: "ni ni-single-02 text-yellow",
    component: MemberDetail,
    layout: "/admin",
    showInSidebar: false,
    type: routeTypes.PRIVATE,
    allowedForRoles:null //null means All
  },
  {
    path: "/members",
    name: "Members",
    icon: "ni ni-archive-2 text-red",
    component: Members,
    layout: "/admin",
    showInSidebar: true,
    type: routeTypes.PRIVATE,
    allowedForRoles:[userRoles.ROLE_ADMIN, userRoles.ROLE_PRESIDENT, userRoles.ROLE_VP] //null means All
  },
  {
    path: "/boardmembers",
    name: "Board Members",
    icon: "ni ni-archive-2 text-red",
    component: BoardMembers,
    layout: "/admin",
    showInSidebar: true,
    type: routeTypes.PRIVATE,
    allowedForRoles:null //null means All
  },
  {
    path: "/security",
    name: "Security",
    icon: "ni ni-settings-gear-65 text-yellow",
    component: Security,
    layout: "/admin",
    showInSidebar: true,
    type: routeTypes.PRIVATE,
    allowedForRoles:null //null means All
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
    showInSidebar: false,
    type: routeTypes.PRIVATE,
    allowedForRoles:null //null means All
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    type: routeTypes.PUBLIC
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth",
  //   type: routeTypes.PUBLIC
  // },
  {
    path: "/forgotpassword",
    name: "Forgot Password",
    icon: "ni ni-circle-08 text-pink",
    component: ForgotPassword,
    layout: "/auth",
    type: routeTypes.PUBLIC
  },
  {
    path: "/invite",
    name: "Invite",
    icon: "ni ni-circle-08 text-pink",
    component: Invite,
    layout: "/auth",
    type: routeTypes.PUBLIC
  },
  {
    path: "/change-password",
    name: "Change Password",
    icon: "ni ni-circle-08 text-pink",
    component: ChangePassword,
    layout: "/auth",
    type: routeTypes.PUBLIC
  },
];
export default routes;
