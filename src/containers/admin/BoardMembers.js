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
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useState, useEffect } from "react";
import MemberItem from "components/MemberItem/MemberItem";
import MemberService from "../../services/member-service";

const BoardMembers = (props) => {
  const [state, setState] = useState({
    members: [],
  });

  useEffect(() => {
    fetchBoardMembers();
  }, []);

  const fetchBoardMembers = async () => {
    try {
      const response = await MemberService.fetchBoardMembers();
      setState((previousState) => ({
        ...previousState,
        members: response.data,
      }));
    } catch (error) {}
  };

  const showMembersList = () => {
    return state.members.map((item, key) => {
      return <MemberItem member={item} key={key} currentMember={props.member} showMenu={false}/>;
    });
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
                  Board Members
                </h3>
              </CardHeader>
              <Table className="align-items-center table-hover" responsive>
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
                
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default BoardMembers;
