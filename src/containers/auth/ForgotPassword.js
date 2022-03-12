// reactstrap components
import { Card, CardBody, Col } from "reactstrap";
import { useState } from "react";
import ForgotPasswordEmail from "../../components/ForgotPasswordEmail/ForgotPasswordEmail";
import ForgotPasswordOTP from "../../components/ForgotPasswordOtp/ForgotPasswordOTP";
import ResetPassword from "../../components/ResetPassword/ResetPassword";
import AuthService from "services/auth-service";
import { useHistory } from "react-router-dom";
const ForgotPassword = () => {
  const STAGES = {
    EMAIL: "EMAIL",
    OTP: "OTP"
  };
  const [stage, setStage] = useState(STAGES.EMAIL);
  const [state, setState] = useState({
    email: "",
    opt: "",
    password: "",
    error: null
  });

  const history = useHistory();
  const navigateToLogin = () => {
    let path = `/auth/login`;
    history.push(path);
  };
  const handleStage = async data => {
    switch (stage) {
      case STAGES.EMAIL: {
        try {
          await AuthService.forgotPassword(data.email);
          setState({
            ...state,
            email: data.email
          });
          setStage(STAGES.OTP);
        } catch (error) {
          setState({
            ...state,
            error: error
          });
        }
        break;
      }
      case STAGES.OTP: {
        try {
          await AuthService.forgotPasswordSubmit(
            state.email,
            data.otp,
            data.password
          );
          navigateToLogin();
        } catch (error) {
          setState({
            ...state,
            error: error
          });
        }
        break;
      }
      default:
        return setStage(STAGES.EMAIL);
    }
  };

  function renderElement() {
    if (stage === STAGES.EMAIL) {
      // show the email view for recovering password
      return (
        <ForgotPasswordEmail
          value={stage}
          onChange={handleStage}
          error={state.error}
        />
      );
    } else if (stage === STAGES.OTP) {
      // show the OTP view for recovring password
      return (
        <ForgotPasswordOTP
          value={stage}
          onChange={handleStage}
          error={state.error}
        />
      );
    } else {
      // show the reset password view for recovring password
      return <ResetPassword />;
    }
  }

  return (
    <>
      {
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">{renderElement()}</CardBody>
          </Card>
        </Col>
      }
    </>
  );
};

export default ForgotPassword;
