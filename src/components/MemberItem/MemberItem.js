import {
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Progress,
} from "reactstrap";
import { useHistory, generatePath } from "react-router-dom";
import ChangeRoleModal from "components/ChangeRoleModal/ChangeRoleModal";
import ConfirmationModal from "components/ConfirmationModal/ConfirmationModal";
import { useState } from "react";
import { ConsoleLogger } from "@aws-amplify/core";
import MemberService from "services/member-service";
import { userRoles } from "../../constants";

const MemberItem = (props) => {
  const history = useHistory();
  const [state, setState] = useState({
    showChangeRoleModal: false,
    showConfirmationModal: false,
    deleteError: null,
  });

  const onChangeRoleClick = (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      showChangeRoleModal: true,
    }));
  };
  const onDeleteClick = (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      showConfirmationModal: true,
      deleteError: null,
    }));
  };
  const onStatusChangeClick = async (e) => {
    e.preventDefault();
    let newStatus;

    if (member.status == "ENABLE") {
      newStatus = "DISABLE";
    } else {
      newStatus = "ENABLE";
    }

    try {
      const responseMember = await MemberService.changeStatus(
        member.id,
        newStatus
      );

      props.onUpdate(responseMember);
    } catch (error) {}
  };

  const onConfirmModalClose = async () => {
    try {
      const deleteResponse = await MemberService.deleteMember(member.id);
      props.onDelete(member);
      setState((prevState) => ({
        ...prevState,
        deleteError: null,
        showConfirmationModal: false,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        deleteError: error,
        showConfirmationModal: true,
      }));
    }
  };

  const modalonChangeRoleModalClose = (member) => {
    props.onUpdate(member);
    setState((prevState) => ({
      ...prevState,
      showChangeRoleModal: false,
    }));
  };

  const onDeleteCancelClick = () => {
    setState((prevState) => ({
      ...prevState,
      showConfirmationModal: false,
    }));
  };

  const member = props.member;

  function navigateToMemberDetail(e) {
    if (member.role !== userRoles.ROLE_MEMBER) {
      e.preventDefault();
      const id = member.id;
      let path = `/admin/member-profile/:id`;
      history.push(generatePath(path, { id }));
    }
  }

  return (
    <>
      <ConfirmationModal
        showModal={state.showConfirmationModal}
        onConfirm={onConfirmModalClose}
        onCancel={onDeleteCancelClick}
        member={props.member}
        header="Confirmation"
        body="Are you sure you want to delete this member"
        error={state.deleteError}
      />
      <ChangeRoleModal
        showModal={state.showChangeRoleModal}
        onClose={modalonChangeRoleModalClose}
        member={props.member}
      />
      <tr>
        <th scope="row" onClick={(e) => navigateToMemberDetail(e)}>
          <Media className="align-items-center">
            <a
              className="avatar rounded-circle mr-3"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <img alt="..." src={member.image.url} />
            </a>
            <Media>
              <span className="mb-0 text-sm">{member.fullName}</span>
            </Media>
          </Media>
        </th>
        <td>{member.email}</td>
        <td>
          <span className="mb-0 text-sm">{member.role}</span>
          {/* <Badge color="" >
            <i className="bg-danger" />
            {props.item.role}
          </Badge> */}
        </td>
        <td>
          <span className="mb-0 text-sm">{member.status}</span>
        </td>
        {/* <td>
          <div className="d-flex align-items-center">
            <span className="mr-2">60%</span>
            <div>
              <Progress max="100" value="60" barClassName="bg-danger" />
            </div>
          </div>
        </td> */}
        <td className="text-right">
          {props.showMenu &&
          props.member.role != userRoles.ROLE_ADMIN &&
          props.currentMember &&
          props.member.id != props.currentMember.id ? (
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn-icon-only text-light"
                href="#pablo"
                role="button"
                size="sm"
                color=""
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <i className="fas fa-ellipsis-v" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                {props.isAllowedToChangeUserRole ? (
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => onChangeRoleClick(e)}
                  >
                    Change Role
                  </DropdownItem>
                ) : (
                  <></>
                )}
                <DropdownItem
                  href="#pablo"
                  onClick={(e) => onStatusChangeClick(e)}
                >
                  {member.status == "ENABLE" ? "DISABLE" : "ENABLE"}
                </DropdownItem>
                {props.isAllowedToDelete &&
                props.member.role != userRoles.ROLE_ADMIN ? (
                  <DropdownItem href="#pablo" onClick={(e) => onDeleteClick(e)}>
                    Delete
                  </DropdownItem>
                ) : (
                  <></>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            <></>
          )}
        </td>
      </tr>
    </>
  );
};
export default MemberItem;
