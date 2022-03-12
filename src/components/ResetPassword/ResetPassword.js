
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
  Col,
} from "reactstrap";
import { useHistory } from "react-router-dom";

const ResetPassword = () => {
  const history = useHistory();
  const navigateToLogin = () =>{ 
    let path = `/auth/login`; 
    history.push(path);
  }

    return (
      <>
              <div className="text-center text-muted mb-4">
                <small>Enter your new password.</small>
              </div>
              <Form role="form">
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
                      autoComplete="new-password"
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
                      placeholder="confirm password"
                      type="password"
                      autoComplete="new-password"
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button"
                  onClick={navigateToLogin}
                  >
                    Reset Password
                  </Button>
                </div>
              </Form>
         </>
    );
};
export default ResetPassword;
