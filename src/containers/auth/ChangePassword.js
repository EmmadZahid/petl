// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

import { connect } from "react-redux";
import React from "react";
import { Alert } from "reactstrap";
import { authActions } from "./state/authActions";
import { withRouter } from "react-router";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    newPassword: ""
  };

  handleChange = event => {
    const name = event.target.name;
    const newState = {};
    newState[name] = event.target.value;
    this.setState(newState);
  };

  onSubmit = async event => {
    event.preventDefault();

    this.props.changePasswordChallenge(
      this.props.auth.cognitoUser,
      this.state.newPassword
    );
  };

  showError = () => {
    const { chanllengeError } = this.props.auth;
    if (chanllengeError) {
      return <Alert color="danger">{chanllengeError.message}</Alert>;
    }
  };

  navigateToLogin = () => {
    this.props.history.push("/auth/login");
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.auth.newPasswordRequired !=
        this.props.auth.newPasswordRequired &&
      this.props.auth.newPasswordRequired == false
    ) {
      this.navigateToLogin();
    }
  }

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Change your password</small>
              </div>
              <Form
                role="form"
                onSubmit={e => {
                  this.onSubmit(e);
                }}
              >
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      autoComplete="new-password"
                      name="newPassword"
                      value={this.state.newPassword}
                      onChange={e => {
                        this.handleChange(e);
                      }}
                    />
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="submit"
                    disabled={this.props.auth.loading}
                  >
                    Change Password
                  </Button>
                </div>
                {this.showError()}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = {
  changePasswordChallenge: authActions.changePasswordChallenge.request
};

ChangePassword = connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
export default withRouter(ChangePassword);
