import React from "react";
import { userRoles } from "constants.js";
import MemberService from "services/member-service";
// reactstrap components
import {
  Button,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Alert,
  Label,
  Row,
} from "reactstrap";

class ChangeRoleModal extends React.Component {
  state = {
    name: "",
    email: "",
    showModal: false,
    loading: false,
    error: null,
    newRole: this.props.member.role,
  };

  // sendInvite = async state => {
  //   this.toggleSendInvitationButton();
  //   this.setState({
  //     error: null
  //   })
  //   try {
  //     await UserService.inviteMember(this.state.name, this.state.email);
  //     this.toggleModal();
  //   } catch (error) {
  //     this.toggleSendInvitationButton();
  //     this.setState({
  //       error: error
  //     });
  //   }
  // };

  // onChangeName = e => {
  //   this.setState({
  //     name: e
  //   });
  // };
  // onChangeEmail = e => {
  //   this.setState({
  //     email: e
  //   });
  // };
  // toggleSendInvitationButton = () => {
  //   this.setState({
  //     loading: !this.state.loading
  //   });
  // };
  changeRoleSubmit = async (state) => {
    this.toggleSubmitButton();
    this.setState({
      error: null,
    });
    try {
      const member = await MemberService.changeRole(
        this.props.member.id,
        this.state.newRole
      );
      this.toggleSubmitButton();
      this.props.onClose(member);
    } catch (error) {
      this.toggleSubmitButton();
      this.setState({
        error: error,
      });
    }
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      newRole: value,
    });
  };

  toggleSubmitButton = () => {
    this.setState({
      loading: !this.state.loading,
    });
  };

  toggleModal = () => {
    // this.setState({
    //   showModal: !this.state.showModal
    // });

    this.props.onClose();
  };

  showError = () => {
    if (this.state.error) {
      return <Alert color="danger">{this.state.error.message}</Alert>;
    }
  };

  render() {
    return (
      <>
        {/* <h1>hello</h1> */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.props.showModal}
          toggle={() => this.toggleModal()}
        >
          <div className="modal-header">
            <h3 className="modal-title">Select Role</h3>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal()}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            {Object.values(userRoles).map((userRole) => {
              if (userRole != "ROLE_ADMIN") {
                return (
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="radio1"
                        value={userRole}
                        defaultChecked={this.props.member.role == userRole}
                        onChange={this.handleChange}
                      />{" "}
                      {userRole}
                    </Label>
                  </FormGroup>
                );
              }
            })}
            <FormGroup tag="fieldset"></FormGroup>
            {this.showError()}
          </div>

          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal()}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="button"
              onClick={() => this.changeRoleSubmit()}
              style={{ float: "right" }}
              disabled={this.state.loading}
            >
              Submit
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default ChangeRoleModal;
