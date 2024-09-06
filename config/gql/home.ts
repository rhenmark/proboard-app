import { gql } from "@apollo/client";

export const GET_HOME_LIST = gql`
query {
  proboardCollection {
    items {
      title
      shortDescription
      developer {
        username
        profileImage {
            url
        }
      }
      imagePreview {
        url
      }
      type
      slug
      sys {
        id
      }
    }
  }
  developerCollection {
    items {
      username
      profileImage { 
          url
      }
    }
  }
}
`