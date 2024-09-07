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