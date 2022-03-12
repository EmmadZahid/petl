import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";
import MemberService from "../../services/member-service";
import { authActions } from "containers/auth/state/authActions";
import ErrorModal from "components/ErrorModal/ErrorModal";

const _MemberDetail = (props) => {
  const { id } = useParams();
  const memberRef = useRef(false);
  const inputProfilePic = useRef(null);
  const location = useLocation();

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    address: "",
    dateOfBirth: "",
    error: null,
    isLoading: false,
    showEditProfileForm: false,
    memberDetail: null,
    isLoggedInMemberDetail: true,
    showErrorModal: false,
  });

  useEffect(() => {
    if (props.user && !memberRef.current) {
      memberRef.current = true;
      populateMemberDetail();
    }
  });

  useEffect(() => {
    if (props.user) {
      populateMemberDetail();
    }
  }, [location]);

  const setLoggedInMemberProfile = () => {
    setState((prevState) => ({
      ...prevState,
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      address: props.user.address,
      dateOfBirth: props.user.dateOfBirth,
      error: null,
      isLoggedInMemberDetail: true,
      memberDetail: props.user,
    }));
  };

  const populateMemberDetail = () => {
    if (id !== props.user.id) {
      fetchMemberProfile();
    } else {
      setLoggedInMemberProfile();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditProfile = () => {
    setState((prevState) => ({
      ...prevState,
      showEditProfileForm: !state.showEditProfileForm,
    }));
  };
  const callEditProfile = async () => {
    setState((prevState) => ({
      ...prevState,
      error: null,
      isLoading: true,
    }));
    try {
      const response = await MemberService.updateProfile(
        state.firstName,
        state.lastName,
        state.address,
        state.dateOfBirth
      );
      props.updateProfile(response);
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: error,
        isLoading: false,
      }));
    }
  };

  const assignRef = async () => {
    inputProfilePic.current.click();
  };
  const uploadProfilePic = async (e) => {
    setState((prevState) => ({
      ...prevState,
      error: null,
      isLoading: true,
    }));
    try {
      const response = await MemberService.uploadProfilePic(e.target.files[0]);
      props.updateProfile(response);
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        memberDetail: response,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: error,
        isLoading: false,
      }));
    }
  };

  const fetchMemberProfile = async () => {
    setState((prevState) => ({
      ...prevState,
      error: null,
      isLoading: true,
      isLoggedInMemberDetail: false,
      showEditProfileForm: false,
      memberDetail: null,
    }));
    try {
      const response = await MemberService.getMemberProfile(id);
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        memberDetail: response,
      }));
    } catch (error) {
      if (error.statusCode === 500) {
        setState((prevState) => ({
          ...prevState,
          error: error,
          isLoading: false,
          showErrorModal: true,
        }));
      }
    }
  };

  const onErrorModalClose = () => {
    setState((prevState) => ({
      ...prevState,
      showErrorModal: false,
    }));
  };

  return (
    <>
      <UserHeader
        isLoggedInMemberDetail={state.isLoggedInMemberDetail}
        memberDetail={state.memberDetail}
        onChange={handleEditProfile}
      />
      <ErrorModal
        showModal={state.showErrorModal}
        onConfirm={onErrorModalClose}
        header="Error"
        error={state.error}
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          {/* <Col className="order-xl-2 mb-5 mb-xl-0" xl="4"> */}
          <Col className="order-xl-2 ">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={state.memberDetail && state.memberDetail.image.url}
                      />
                    </a>
                  </div>
                </Col>
              </Row>

              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                {state.showEditProfileForm && (
                  <div className="d-flex justify-content-between">
                    <input
                      className="mr-4"
                      type="file"
                      id="file-upload"
                      ref={inputProfilePic}
                      style={{ display: "none" }}
                      onChange={(event) => {
                        uploadProfilePic(event);
                      }}
                    />

                    <Button
                      color="info"
                      disabled={state.isLoading}
                      name="myImage"
                      onClick={(e) => assignRef()}
                      size="sm"
                    >
                      Upload image
                    </Button>
                  </div>
                )}
              </CardHeader>

              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>{state.memberDetail && state.memberDetail.fullName}</h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {props.user && props.user.username}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div>
                  <hr className="my-4" />
                  <p>
                    Ryan — the name taken by Melbourne-raised, Brooklyn-based
                    Nick Murphy — writes, performs and records all of his own
                    music.
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
          {state.showEditProfileForm && (
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Full name
                            </label>
                            <Input
                              className="form-control-alternative"
                              readOnly={true}
                              id="input-username"
                              placeholder={props.user && props.user.fullName}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              readOnly={true}
                              id="input-email"
                              placeholder={props.user && props.user.email}
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="First name"
                              type="text"
                              name="firstName"
                              value={state.firstName}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                              name="lastName"
                              value={state.lastName}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                              name="address"
                              value={state.address}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-address"
                        >
                          Date of Birth
                        </label>
                        <Input
                          type="date"
                          name="dateOfBirth"
                          value={state.dateOfBirth}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          placeholder="Date of Birth"
                        />
                      </FormGroup>
                    </div>
                  </Form>
                  <Row>
                    <Col className="text-right">
                      <Button onClick={(e) => handleEditProfile()} size="lr">
                        Cancel
                      </Button>
                    </Col>
                    <Col className="text-left">
                      <Button
                        color="primary"
                        size="lr"
                        disabled={state.isLoading}
                        onClick={(e) => callEditProfile()}
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
                <div>
                  {state.error && (
                    <Alert color="danger">{state.error.message}</Alert>
                  )}
                </div>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};
const mapDispatchToProps = {
  updateProfile: authActions.updateProfile.success,
};

const MemberDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(_MemberDetail);
export default MemberDetail;
