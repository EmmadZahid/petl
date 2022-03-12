// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Alert
} from "reactstrap";
import { useState } from "react";

const ForgotPasswordOTP = props => {
  const [state, setState] = useState({
    otp: "",
    password: "",
    loading: false
  });

  const onSubmit = e => {
    e.preventDefault();
    props.onChange({ otp: state.otp, password: state.password });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  };

  return (
    <>
      <div className="text-center text-muted mb-4">
        <small>Enter OTP received in email and your new password.</small>
      </div>
      <Form role="form" onSubmit={onSubmit}>
        <FormGroup className="mb-3">
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-email-83" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="OTP"
              type="text"
              name="otp"
              onChange={handleChange}
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
              placeholder="password"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </InputGroup>
        </FormGroup>
        {/* <FormGroup>
          <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-lock-circle-open" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="confirm password"
              type="password"
              name="confirmPassword"
              onChange={handleChange}
            />
          </InputGroup>
        </FormGroup> */}
        <div className="text-center">
          {/* <Link to="/auth/resetpassword" className="btn btn-primary">Submit</Link> */}
          <Button className="my-4" color="primary" type="submit">
            Submit
          </Button>
        </div>
        {props.error && <Alert color="danger">{props.error.message}</Alert>}
      </Form>
    </>
  );
};
export default ForgotPasswordOTP;
