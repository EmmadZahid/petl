import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  Button,
  FormGroup,
  Input,
  Alert
} from "reactstrap";
import { useState } from "react";
import AuthService from "../../services/auth-service";
const ChangeUserPassword = props => {
  const [state, setState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    loading: false,
    success: false,
    error: null
  });

  const handleChange = e => {
    const { id, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [id]: value,
      error: false,
      success: false
    }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (state.newPassword === state.confirmPassword) {
      setState(prevState => ({
        ...prevState,
        error: null,
        success: false,
        loading: true
      }));

      try {
        await AuthService.changeMemberPassword(
          state.oldPassword,
          state.newPassword
        );
        setState(prevState => ({
          ...prevState,
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
          error: null,
          loading: false,
          success: true
        }));
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          error: error,
          loading: false
        }));
      }
    } else {
      setState(prevState => ({
        ...prevState,
        success: false,
        error: new Error("Passwords does not match")
      }));
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h6 className="heading-small text-muted mb-4">Change Password</h6>
        <div className="pl-lg-4">
          <Row>
            <Col lg="12">
              <FormGroup>
                <label className="form-control-label" htmlFor="oldPassword">
                  Old Password
                </label>
                <Input
                  className="form-control-alternative"
                  id="oldPassword"
                  placeholder="Old Password"
                  type="password"
                  value={state.oldPassword}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col lg="12">
              <FormGroup>
                <label className="form-control-label" htmlFor="newPassword">
                  New Password
                </label>
                <Input
                  className="form-control-alternative"
                  id="newPassword"
                  placeholder="New Password"
                  type="password"
                  value={state.newPassword}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col lg="12">
              <FormGroup>
                <label className="form-control-label" htmlFor="confirmPassword">
                  Confrim Password
                </label>
                <Input
                  className="form-control-alternative"
                  id="confirmPassword"
                  placeholder="Confrim Password"
                  type="password"
                  value={state.confirmPassword}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {state.success && (
              <Alert color="success">Password changed successfully.</Alert>
            )}
            {state.error && <Alert color="danger">{state.error.message}</Alert>}
            <Col className="text-right" xs="12">
              <Button color="primary" disabled={state.loading}>
                Change
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </>
  );
};

export default ChangeUserPassword;
