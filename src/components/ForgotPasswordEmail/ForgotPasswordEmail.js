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

const ForgotPasswordEmail = props => {
  const [state, setState] = useState({
    email: "",
    loading: false
  });

  const onSubmit = e => {
    e.preventDefault();
    setState({
      ...state,
      loading: true
    });
    props.onChange({ email: state.email });
  };

  const handleChange = e => {
    setState({
      ...state,
      email: e.target.value,
      error: null
    });
  };

  return (
    <>
      <div className="text-center text-muted mb-4">
        <small>Enter your mail to recover password</small>
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
              placeholder="Email"
              type="email"
              autoComplete="new-email"
              onChange={handleChange}
            />
          </InputGroup>
        </FormGroup>
        <div className="text-center">
          <Button className="my-4" color="primary" type="submit">
            Submit
          </Button>
        </div>
        {props.error && <Alert color="danger">{props.error.message}</Alert>}
      </Form>
    </>
  );
};

export default ForgotPasswordEmail;
