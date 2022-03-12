import client from "../common/axio-client";
import memberImage from "../assets/img/default-member.png";
const MemberService = {
  getMyProfile: async () => {
    try {
      const response = await client.get("/members/me");
      let member = response.data;
      if (member.firstName === null || member.firstName === undefined) {
        member.firstName = "";
      }
      if (member.lastName === null || member.lastName === undefined) {
        member.lastName = "";
      }
      if (member.address === null || member.address === undefined) {
        member.address = "";
      }
      if (member.dateOfBirth === null || member.dateOfBirth === undefined) {
        member.dateOfBirth = "";
      }
      if (!member.image) {
        member.image = {
          url: memberImage
        };
      }
      return member;
    } catch (error) {
      const customError = new Error(error.message);
      throw customError;
    }
  },
  inviteMember: async (fullName, username) => {
    try {
      const response = await client.post("/members/invite", {
        fullName: fullName,
        email: username
      });
      return response.data;
    } catch (error) {
      const customError = new Error(error.message);
      throw customError;
    }
  },
  fetchMembers: async (page, pageSize) => {
    try {
      const response = await client.get("/members", {
        params: {
          page: page,
          pageSize: pageSize
        }, 
      });
      const { count, data } = response.data;
      let members = data;
      if (members) {
        members = members.map(member => {
          if (!member.image) {
            member.image = {
              url: memberImage
            };
          }
          return member;
        });
      }
      return {
        count: count,
        data: members
      };
    } catch (error) {
      const customError = new Error(error.message);
      throw customError;
    }
  },
  fetchBoardMembers: async () => {
    try {
      const response = await client.get("/members/board");
      const { count, data } = response.data;
      let members = data;
      if (members) {
        members = members.map(member => {
          if (!member.image) {
            member.image = {
              url: memberImage
            };
          }
          return member;
        });
      }
      return {
        count: count,
        data: members
      };
    } catch (error) {
      const customError = new Error(error.message);
      throw customError;
    }
  },
  changeRole: async (memberId, role) => {
    try {
      const response = await client.patch(
        `/members/${memberId}/role?role=${role}`
      );
      let member = response.data
      if (!member.image) {
        member.image = {
          url: memberImage
        };
      }
      return member;
    } catch (error) {
      const customError = new Error(error.message);
      throw customError;
    }
  },
  updateProfile: async (firstName, lastName, address, dateOfBirth) => {
    try {
      const response = await client.put("/members/me", {
        firstName: firstName,
        lastName: lastName,
        address: address,
        dateOfBirth: dateOfBirth,
        fullName: firstName + " " + lastName
      });
      return response.data;
    } catch (error) {
      const customError = new Error(error.message);
      throw customError;
    }
  },
  changeStatus: async (memberId, status) => {
    try {
      const response = await client.patch(
        `/members/${memberId}/status?status=${status}`
      );
      let member = response.data
      if (!member.image) {
        member.image = {
          url: memberImage
        };
      }
      return member;
    } catch (error) {
      const customError = new Error(error.message);
      throw customError;
    }
  },
  deleteMember: async memberId => {
    try {
      const response = await client.delete(`/members/${memberId}`);
      return response.data;
    } catch (error) {
      const customError = new Error(error.message);
      throw customError;
    }
  },
  getMemberProfile: async id => {
    try {
      const response = await client.get("/members/" + id);
      let member = response.data
      if (!member.image) {
        member.image = {
          url: memberImage
        };
      }
      return member;
    } catch (error) {
      console.log(error);
      const customError = new Error(error.message);
      throw customError;
    }
  },
  uploadProfilePic: async (file) => {
    const formData = new FormData();
    formData.append('picture', file);
    try {
      const response = await client.post("/members/me/image", formData, {
        
        headers: {
          "Content-Type": "multipart/form-data"
        } 
      });
      return response.data;
    } catch (error) {
      const customError = new Error(error.message);
      throw customError;
    }
  },
};

export default MemberService;
