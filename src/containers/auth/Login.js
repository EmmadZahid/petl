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
import { authActions } from "./state/authActions";
import React from "react";
import { Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: "",
    password: ""
  };

  componentWillMount() {
    this.navigateFromLogin();
  }

  handleChange = event => {
    const name = event.target.name;
    const newState = {};
    newState[name] = event.target.value;
    this.setState(newState);
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.loginUser(this.state.email, this.state.password);
  };

  showError = () => {
    const { error } = this.props.auth;
    if (error) {
      return <Alert color="danger">{error.message}</Alert>;
    }
  };

  navigateFromLogin = () => {
    if (this.props.auth.newPasswordRequired) {
      this.props.history.push("/auth/change-password");
    }
  };
  componentDidUpdate(prevProps) {
    this.navigateFromLogin();
  }

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            {/* <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/icons/common/github.svg")
                          .default
                      }
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/icons/common/google.svg")
                          .default
                      }
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader> */}
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Please enter credentials to sign in</small>
              </div>
              <Form
                role="form"
                onSubmit={e => {
                  this.onSubmit(e);
                }}
              >
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      name="email"
                      autoComplete="new-email"
                      value={this.state.email}
                      onChange={e => {
                        this.handleChange(e);
                      }}
                    />
                  </InputGroup>
                </FormGroup>
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
                      name="password"
                      value={this.state.password}
                      onChange={e => {
                        this.handleChange(e);
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="submit"
                    disabled={this.props.auth.loading}
                  >
                    Sign in
                  </Button>
                </div>
                {this.showError()}
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <Link className="text-light" to="/auth/forgotpassword">
                <small>Forgot password?</small>
              </Link>
            </Col>
            {/* <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col> */}
          </Row>
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
  loginUser: authActions.loginUser.request
};

Login = connect(mapStateToProps, mapDispatchToProps)(Login);
export default withRouter(Login);
