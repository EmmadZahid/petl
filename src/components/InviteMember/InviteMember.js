import React from "react";
// reactstrap components
import {
  Button,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Alert
} from "reactstrap";
import MemberService from "../../services/member-service";

class InviteModal extends React.Component {
  state = {
    name: "",
    email: "",
    showModal: false,
    loading: false,
    error: null
  };

  sendInvite = async state => {
    this.toggleSendInvitationButton();
    this.setState({
      error: null
    })
    try {
      await MemberService.inviteMember(this.state.name, this.state.email);
      this.toggleModal();
    } catch (error) {
      this.toggleSendInvitationButton();
      this.setState({
        error: error
      });
    }
  };

  onChangeName = e => {
    this.setState({
      name: e
    });
  };
  onChangeEmail = e => {
    this.setState({
      email: e
    });
  };
  toggleSendInvitationButton = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
      loading:this.state.showModal?false:this.state.loading,
      error: null
    });
  };

  showError = () => {
    if (this.state.error) {
      return <Alert color="danger">{this.state.error.message}</Alert>;
    }
  };

  render() {
    return (
      <>
        <Button
          color="primary"
          type="button"
          onClick={() => this.toggleModal()}
          style={{ float: "right" }}
        >
          Invite
        </Button>
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.showModal}
          toggle={() => this.toggleModal()}
        >
          <div className="modal-header">
            <h5 className="modal-title">Send Invite</h5>
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
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-circle-08" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Name"
                  type="text"
                  name="name"
                  onChange={e => this.onChangeName(`${e.target.value}`)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Email"
                  type="email"
                  name="inviteEmail"
                  autoComplete="new-email"
                  onChange={e => this.onChangeEmail(`${e.target.value}`)}
                />
              </InputGroup>
            </FormGroup>
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
              onClick={() => this.sendInvite()}
              disabled={this.state.loading}
            >
              Invite
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default InviteModal;
