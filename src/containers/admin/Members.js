/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Spinner,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import InviteMember from "components/InviteMember/InviteMember.js";
import ChangeRoleModal from "components/ChangeRoleModal/ChangeRoleModal";
import { useState, useEffect, useRef } from "react";
import AuthService from "services/auth-service";
import { userRoles } from "../../constants";
import MemberItem from "components/MemberItem/MemberItem";
import MemberService from "../../services/member-service";
import PaginationControl from "components/PaginationControl/PaginationControl";

const Members = (props) => {
  const [state, setState] = useState({
    isAllowedToInvite: false,
    isAllowedToDelete: false,
    isAllowedToChangeUserRole: false,
    members: [],
    totalMembers: 0,
    pageSize: 5,
    page: 1,
    showChangeRoleModal: false,
    loading: false,
  });

  const memberRef = useRef(false);

  useEffect(() => {
    if (props.member && !memberRef.current) {
      memberRef.current = true;
      const isAdminOrVP = AuthService.memberHasRole(props.member, [
        userRoles.ROLE_ADMIN,
        userRoles.ROLE_VP,
      ]);
      const isAdminOrVPOrPresident = AuthService.memberHasRole(props.member, [
        userRoles.ROLE_ADMIN,
        userRoles.ROLE_VP,
        userRoles.ROLE_PRESIDENT
      ]);
      setState((prevState) => ({
        ...prevState,
        isAllowedToInvite: isAdminOrVP,
        isAllowedToDelete: isAdminOrVP,
        isAllowedToChangeUserRole: isAdminOrVPOrPresident,
      }));
    }
  });

  useEffect(() => {
    fetchMembers(1);
  }, []);

  const fetchMembers = async (page) => {
    try {
      const response = await MemberService.fetchMembers(
        page,
        state.pageSize
      );
      setState((previousState) => ({
        ...previousState,
        members: response.data,
        totalMembers: response.count,
        loading: false,
        page: page,
      }));
    } catch (error) {}
  };

  const memberUpdate = (member) => {
    if (member) {
      for (let i = 0; i < state.members.length; i++) {
        if (state.members[i].id == member.id)
          state.members.splice(i, 1, member);
      }
      setState((previousState) => ({
        ...previousState,
      }));
    }
  };
  const memberDelete = (member) => {
    if (member) {
      for (let i = 0; i < state.members.length; i++) {
        if (state.members[i].id == member.id) state.members.splice(i, 1);
      }
      setState((previousState) => ({
        ...previousState,
      }));
    }
  };
  const showMembersList = () => {
    return state.members.map((item, key) => {
      return (
        <MemberItem
          member={item}
          key={key}
          onUpdate={memberUpdate}
          onDelete={memberDelete}
          currentMember={props.member}
          showMenu={true}
          isAllowedToDelete={state.isAllowedToDelete}
          isAllowedToChangeUserRole={state.isAllowedToChangeUserRole}
        />
      );
    });
  };

  const pageSelectHandler = (pageNo) => {
    fetchMembers(pageNo);
    setState((previousState) => ({
      ...previousState,
      loading: true,
    }));
  };

  return (
    <>
      <Header />

      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0" style={{ float: "left" }}>
                  Members
                </h3>
                {state.isAllowedToInvite && <InviteMember />}
              </CardHeader>
              <Table
                className="align-items-center table-hover"
                responsive
                style={{ position: "relative" }}
              >
                {state.loading ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      opacity: 0.5,
                      backgroundColor: "#eee",
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Spinner color="primary" />
                  </div>
                ) : (
                  ""
                )}
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                    {/* <th scope="col">Profile Completion</th> */}
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>{state.members && showMembersList()}</tbody>
              </Table>
              <CardFooter className="py-4">
                {state.totalMembers && (
                  <PaginationControl
                    totalItems={state.totalMembers}
                    pageSize={state.pageSize}
                    currentPage={state.page}
                    onSelect={pageSelectHandler}
                    controlDisabled={state.loading}
                  ></PaginationControl>
                )}
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Members;
