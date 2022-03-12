import { Auth } from "aws-amplify";
import { userRoles, localStorageKeys } from "../constants";
import LocalStorageService from "../services/localstorage-service";
const AuthService = {
  login: async (email, password) => {
    try {
      const response = await Auth.signIn(email, password);
      if (response.challengeName !== "NEW_PASSWORD_REQUIRED") {
        let token = "";
        let roles = [];
        try {
          token = response.signInUserSession.idToken.jwtToken;
          roles = response.signInUserSession.idToken.payload["cognito:groups"];
          LocalStorageService.setItem(localStorageKeys.ID_TOKEN, token);
          LocalStorageService.setItem(localStorageKeys.USER_ROLES, roles);
        } catch (error) {}
      }
      return response;
    } catch (error) {
      const customError = new Error(error.message);
      throw customError;
    }
  },
  changePasswordOnLogin: async (cognitoUser, newPassword) => {
    try {
      if (!cognitoUser) {
        throw new Error("User is not logged in.");
      }
      let res = await Auth.completeNewPassword(cognitoUser, newPassword);
      return res;
    } catch (error) {
      const customError = new Error(error.message);
      throw customError;
    }
  },
  changeMemberPassword: async (oldPassword, newPassword) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, oldPassword, newPassword);
    } catch (error) {
      const customError = new Error(error.message);
      throw customError;
    }
  },
  logout: async () => {
    try {
      const response = await Auth.signOut();
      LocalStorageService.removeItem(localStorageKeys.ID_TOKEN);
      LocalStorageService.removeItem(localStorageKeys.USER_ROLES);
      return response;
    } catch (error) {
      const customError = new Error(error.message);
      throw customError;
    }
  },
  isMemberLoggedIn: () =>{
    const token = LocalStorageService.getItem(localStorageKeys.ID_TOKEN)
    return token ? true :  false
  },
  memberHasRole: (member, roles) => {
    if(!member || !roles) return false
    return roles.find(role => role === member.role) ? true : false
  },
  forgotPassword: async email => {
    await Auth.forgotPassword(email);
  },
  forgotPasswordSubmit: async (email, otp, password) => {
    await Auth.forgotPasswordSubmit(email, otp, password);
  },
};

export default AuthService;
