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

class ConfirmationModal extends React.Component {
  state = {
    showModal: false,
    loading: false,
  };
  componentDidUpdate(prevProps){
    if (this.props.error && this.props.error!=prevProps.error){
      this.toggleButton();
    }
  }
  toggleButton = () =>{
    if(this.state.loading==false)
    {
      this.setState({
        loading:true
      });
    }
    else{
      this.setState({
        loading:false
      });
    }
  }
  confirmClick = async () => {
    this.toggleButton()
    this.props.onConfirm();
  };

  toggleSubmitButton = () => {
    this.props.onclose();
  };

  closeModal = () => {
    this.props.onCancel();
  };
  toggleModal = () => {
    this.state.showModal = false;
  };
  showError = () => {
    // console.log(this.props.error)
    if (this.props.error != null) {
      return <Alert color="danger">{this.props.error.message}</Alert>;
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
            <h3 className="modal-title">{this.props.header}</h3>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.closeModal()}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            {this.props.body}

            <FormGroup tag="fieldset"></FormGroup>
            {this.showError()}
          </div>

          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.closeModal()}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="button"
              onClick={() => this.confirmClick()}
              style={{ float: "right" }}
              disabled={this.state.loading}
            >
              Confirm
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default ConfirmationModal;
