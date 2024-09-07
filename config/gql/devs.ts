import { gql } from "@apollo/client";

export const GET_DEVELOPER_LIST = gql`
  query {
    developerCollection {
      items {
        username
        currentPosition
        profileImage {
          url
        }
      }
    }
  }
`;

export const GET_DEVELOPER_INFO = gql`
  query GetDeveloper($username: String!) {
    developerCollection(where: { username: $username }) {
      items {
        username
        currentPosition
        mobileNumber
        profileImage {
          url
          fileName
        }
        skills
        interests
        socialMedia
        certificates
        resumeLink
      }
    }
  }
`;